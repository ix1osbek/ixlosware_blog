import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { createPost, updatePost, deletePost } from "../controllers/postController.js";
import { adminLogin } from "../controllers/adminAuthController.js";

import { adminAuth } from "../middleware/adminAuth.js"; // ✅ Adminni tekshiruvchi middleware

const router = Router();

// Admin login
router.post("/login", adminLogin);


// POST yaratish (faqat admin)
router.post("/posts", adminAuth, upload.single("image"), createPost);

// POST yangilash (faqat admin)
router.put("/posts/:id", adminAuth, upload.single("image"), updatePost);

// POST o‘chirish (faqat admin)
router.delete("/posts/:id", adminAuth, deletePost);

export default router;
