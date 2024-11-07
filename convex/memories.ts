import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const store = mutation({
  args: {
    memory: v.object({
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
    })
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('memories', args.memory);
  }
});

export const list = query({
  args: {
    type: v.optional(v.string()),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query('memories');
    
    if (args.type) {
      query = query.filter(q => q.eq(q.field('type'), args.type));
    }
    
    if (args.limit) {
      query = query.take(args.limit);
    }
    
    return await query.collect();
  }
});