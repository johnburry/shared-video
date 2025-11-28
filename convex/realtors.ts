import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get a realtor by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("realtors")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Get all realtors
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("realtors").collect();
  },
});

// Create a new realtor
export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    bio: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    photo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check for admin users
    return await ctx.db.insert("realtors", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Update a realtor
export const update = mutation({
  args: {
    id: v.id("realtors"),
    name: v.optional(v.string()),
    bio: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    photo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check for admin users
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

// Delete a realtor
export const remove = mutation({
  args: { id: v.id("realtors") },
  handler: async (ctx, args) => {
    // TODO: Add auth check for super admin only
    return await ctx.db.delete(args.id);
  },
});
