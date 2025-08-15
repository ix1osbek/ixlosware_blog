import { Router } from "express";
import { getPosts, getPostById } from "../controllers/postController.js";

const router = Router();

// Barcha postlar + qidiruv
router.get("/posts", getPosts);

// Bitta post ID bo‘yicha
router.get("/posts/:id", getPostById);

export default router;
