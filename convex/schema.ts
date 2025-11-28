import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  // Realtor profiles
  realtors: defineTable({
    name: v.string(),
    slug: v.string(), // URL-friendly identifier
    bio: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    photo: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),

  // Videos from different platforms
  videos: defineTable({
    realtorId: v.id("realtors"),
    platform: v.union(
      v.literal("youtube"),
      v.literal("instagram"),
      v.literal("tiktok")
    ),
    videoId: v.string(), // Platform-specific video ID
    title: v.string(),
    description: v.optional(v.string()),
    thumbnail: v.string(),
    url: v.string(),
    publishedAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_realtor", ["realtorId"])
    .index("by_realtor_platform", ["realtorId", "platform"])
    .index("by_realtor_published", ["realtorId", "publishedAt"]),

  // Email subscribers
  subscribers: defineTable({
    realtorId: v.id("realtors"),
    email: v.string(),
    isActive: v.boolean(),
    subscribedAt: v.number(),
  })
    .index("by_realtor", ["realtorId"])
    .index("by_email", ["email"])
    .index("by_realtor_email", ["realtorId", "email"]),

  // Admin users and their permissions
  adminUsers: defineTable({
    userId: v.id("users"), // References auth users table
    isSuperAdmin: v.boolean(),
    assignedRealtorIds: v.array(v.id("realtors")), // Realtors this admin can manage
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  // Email send log
  emailLogs: defineTable({
    realtorId: v.id("realtors"),
    subscriberEmail: v.string(),
    videoId: v.id("videos"),
    sentAt: v.number(),
    status: v.union(v.literal("sent"), v.literal("failed")),
    error: v.optional(v.string()),
  })
    .index("by_realtor", ["realtorId"])
    .index("by_video", ["videoId"]),
});

export default schema;
