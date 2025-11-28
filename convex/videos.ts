import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get videos for a realtor
export const getByRealtor = query({
  args: { realtorId: v.id("realtors") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("videos")
      .withIndex("by_realtor_published", (q) => q.eq("realtorId", args.realtorId))
      .order("desc")
      .collect();
  },
});

// Get videos by realtor and platform
export const getByRealtorAndPlatform = query({
  args: {
    realtorId: v.id("realtors"),
    platform: v.union(
      v.literal("youtube"),
      v.literal("instagram"),
      v.literal("tiktok")
    ),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const videos = await ctx.db
      .query("videos")
      .withIndex("by_realtor_platform", (q) =>
        q.eq("realtorId", args.realtorId).eq("platform", args.platform)
      )
      .order("desc")
      .collect();

    // Sort by publishedAt descending
    videos.sort((a, b) => b.publishedAt - a.publishedAt);

    return args.limit ? videos.slice(0, args.limit) : videos;
  },
});

// Get latest videos across all platforms for a realtor
export const getLatestByRealtor = query({
  args: {
    realtorId: v.id("realtors"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const videos = await ctx.db
      .query("videos")
      .withIndex("by_realtor", (q) => q.eq("realtorId", args.realtorId))
      .collect();

    // Sort by publishedAt descending
    videos.sort((a, b) => b.publishedAt - a.publishedAt);

    return args.limit ? videos.slice(0, args.limit) : videos;
  },
});

// Add a new video
export const create = mutation({
  args: {
    realtorId: v.id("realtors"),
    platform: v.union(
      v.literal("youtube"),
      v.literal("instagram"),
      v.literal("tiktok")
    ),
    videoId: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    thumbnail: v.string(),
    url: v.string(),
    publishedAt: v.number(),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check for admin users
    return await ctx.db.insert("videos", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Update a video
export const update = mutation({
  args: {
    id: v.id("videos"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    thumbnail: v.optional(v.string()),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check for admin users
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

// Delete a video
export const remove = mutation({
  args: { id: v.id("videos") },
  handler: async (ctx, args) => {
    // TODO: Add auth check for admin users
    return await ctx.db.delete(args.id);
  },
});
