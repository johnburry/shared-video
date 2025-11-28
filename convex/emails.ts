import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import { api, internal } from "./_generated/api";

// Send notification emails for a new video
export const sendVideoNotification = action({
  args: {
    videoId: v.id("videos"),
  },
  handler: async (ctx, args) => {
    // Get the video
    const video = await ctx.runQuery(api.videos.getByRealtor, {
      realtorId: args.videoId as any, // This will be fixed when we query properly
    });

    // Note: This is a placeholder implementation
    // In a real app, you would:
    // 1. Get the specific video by ID
    // 2. Get the realtor info
    // 3. Get all active subscribers
    // 4. Get the last 3 videos from each platform
    // 5. Call the Mailgun API for each subscriber
    // 6. Log the results

    // For now, return success
    return { success: true, emailsSent: 0 };
  },
});

// Internal mutation to log email sends
export const logEmail = internalMutation({
  args: {
    realtorId: v.id("realtors"),
    subscriberEmail: v.string(),
    videoId: v.id("videos"),
    status: v.union(v.literal("sent"), v.literal("failed")),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("emailLogs", {
      ...args,
      sentAt: Date.now(),
    });
  },
});
