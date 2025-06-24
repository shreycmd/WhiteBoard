import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const createfile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    const res = await ctx.db.insert("files", args);
    return res;
  },
});

export const getFile = query({
  args: {
    teamId: v.string(),
  },
  handler: async (ctx, args) => {
    const res = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .order("desc")
      .collect();
    return res;
  },
});

export const UpdateDoc = mutation({
  args: {
    _id: v.id("files"),
    document: v.string(),
  },
  handler: async (ctx, args) => {
    const res = await ctx.db.patch(args._id, {
      document: args.document,
    });
    return res;
  },
});
export const getfileByID = query({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const res = await ctx.db.get(args._id);
    return res;
  },
});

export const updateWhiteboard = mutation({
  args: {
    _id: v.id("files"),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, {
      whiteboard: args.whiteboard,
    });
    return result;
  },
});
