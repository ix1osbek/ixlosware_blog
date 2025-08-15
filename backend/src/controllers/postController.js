import { AppDataSource } from "../config/dataSource.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { supabase } from "../config/supabaseClient.js";
import { Post } from "../entities/Post.js";
import { v4 as uuidv4 } from "uuid";

// ✅ CREATE
export const createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400);
        throw new Error("Title va content talab qilinadi");
    }

    let imageUrl = null;
    if (req.file) {
        const fileExt = req.file.originalname.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;

        const { error } = await supabase.storage
            .from("images")
            .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: true,
            });

        if (error) {
            res.status(500);
            throw new Error("Rasm yuklashda xatolik: " + error.message);
        }

        imageUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
    }

    const repo = AppDataSource.getRepository(Post);
    const newPost = repo.create({ title, content, image: imageUrl });
    await repo.save(newPost);

    res.status(201).json({ success: true, data: newPost });
});

// ✅ READ ALL + SEARCH
export const getPosts = asyncHandler(async (req, res) => {
    const search = req.query.search || "";
    const repo = AppDataSource.getRepository(Post);

    let query = repo
        .createQueryBuilder("post")
        .orderBy("post.createdAt", "DESC");

    if (search) {
        query = query.where(
            "post.title ILIKE :search OR post.content ILIKE :search",
            { search: `%${search}%` }
        );
    }

    const posts = await query.getMany();
    res.json({ success: true, data: posts });
});

// ✅ READ ONE BY ID
export const getPostById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const repo = AppDataSource.getRepository(Post);

    const post = await repo.findOne({ where: { id } });
    if (!post) {
        res.status(404);
        throw new Error("Post topilmadi");
    }

    res.json({ success: true, data: post });
});

// ✅ UPDATE
export const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const repo = AppDataSource.getRepository(Post);
    const post = await repo.findOne({ where: { id } });
    if (!post) {
        res.status(404);
        throw new Error("Post topilmadi");
    }

    if (req.file) {
        const fileExt = req.file.originalname.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;

        const { error } = await supabase.storage
            .from("images")
            .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: true,
            });

        if (error) {
            res.status(500);
            throw new Error("Rasm yuklashda xatolik: " + error.message);
        }

        post.image = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await repo.save(post);
    res.json({ success: true, data: post });
});

// ✅ DELETE
export const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const repo = AppDataSource.getRepository(Post);
    const post = await repo.findOne({ where: { id } });
    if (!post) {
        res.status(404);
        throw new Error("Post topilmadi");
    }

    await repo.remove(post);
    res.json({ success: true, message: "Post o'chirildi" });
});
