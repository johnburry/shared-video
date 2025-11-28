import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all active subscribers for a realtor
export const getByRealtor = query({
  args: { realtorId: v.id("realtors") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("subscribers")
      .withIndex("by_realtor", (q) => q.eq("realtorId", args.realtorId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Check if an email is subscribed
export const isSubscribed = query({
  args: {
    realtorId: v.id("realtors"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_realtor_email", (q) =>
        q.eq("realtorId", args.realtorId).eq("email", args.email)
      )
      .first();

    return subscriber?.isActive ?? false;
  },
});

// Subscribe to a realtor's updates
export const subscribe = mutation({
  args: {
    realtorId: v.id("realtors"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if already subscribed
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_realtor_email", (q) =>
        q.eq("realtorId", args.realtorId).eq("email", args.email)
      )
      .first();

    if (existing) {
      // Reactivate if previously unsubscribed
      if (!existing.isActive) {
        await ctx.db.patch(existing._id, { isActive: true });
      }
      return existing._id;
    }

    // Create new subscription
    return await ctx.db.insert("subscribers", {
      realtorId: args.realtorId,
      email: args.email,
      isActive: true,
      subscribedAt: Date.now(),
    });
  },
});

// Unsubscribe from a realtor's updates
export const unsubscribe = mutation({
  args: {
    realtorId: v.id("realtors"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_realtor_email", (q) =>
        q.eq("realtorId", args.realtorId).eq("email", args.email)
      )
      .first();

    if (subscriber) {
      await ctx.db.patch(subscriber._id, { isActive: false });
    }
  },
});
