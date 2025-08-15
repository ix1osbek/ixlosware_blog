import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: null },
  },
  { timestamps: true } 
);

export const Post = mongoose.model("Post", postSchema);
