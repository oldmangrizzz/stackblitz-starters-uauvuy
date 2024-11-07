import { defineSchema, defineTable } from 'convex/schema';
import { v } from 'convex/values';

export default defineSchema({
  memories: defineTable({
    vector: v.array(v.number()),
    type: v.string(),
    layer: v.number(),
    timestamp: v.number(),
    metadata: v.object({
      context: v.string(),
      confidence: v.number(),
      associations: v.array(v.string()),
      dimensions: v.optional(
        v.object({
          spatial: v.optional(v.array(v.number()))
        })
      )
    })
  }),
  thoughtPatterns: defineTable({
    type: v.string(),
    intensity: v.number(),
    frequency: v.number(),
    timestamp: v.number()
  })
});