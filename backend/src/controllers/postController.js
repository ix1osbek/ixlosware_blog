import { Post } from "../entities/Post.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { supabase } from "../config/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

// CREATE
export const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) throw new Error("Title va content talab qilinadi");

  let imageUrl = null;
  if (req.file) {
    const fileExt = req.file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    const { error } = await supabase.storage.from("images").upload(fileName, req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: true,
    });
    if (error) throw new Error("Rasm yuklashda xatolik: " + error.message);

    imageUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
  }

  const newPost = await Post.create({ title, content, image: imageUrl });
  res.status(201).json({ success: true, data: newPost });
});

// READ ALL + SEARCH
export const getPosts = asyncHandler(async (req, res) => {
  const search = req.query.search || "";
  const query = search
    ? { $or: [{ title: { $regex: search, $options: "i" } }, { content: { $regex: search, $options: "i" } }] }
    : {};

  const posts = await Post.find(query).sort({ createdAt: -1 });
  res.json({ success: true, data: posts });
});

// READ ONE
export const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: "Post topilmadi" });
  res.json({ success: true, data: post });
});

// UPDATE
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: "Post topilmadi" });

  if (req.file) {
    const fileExt = req.file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    const { error } = await supabase.storage.from("images").upload(fileName, req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: true,
    });
    if (error) throw new Error("Rasm yuklashda xatolik: " + error.message);

    post.image = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
  }

  post.title = title || post.title;
  post.content = content || post.content;

  await post.save();
  res.json({ success: true, data: post });
});

// DELETE
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: "Post topilmadi" });

  await post.remove();
  res.json({ success: true, message: "Post o'chirildi" });
});
