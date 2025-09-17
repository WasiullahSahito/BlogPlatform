import express from 'express';
const router = express.Router();
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

// Cleanly group routes for the same endpoint
router.route('/')
    .post(protect, createPost) // POST /api/posts (Protected)
    .get(getAllPosts);         // GET /api/posts (Public)

router.route('/:id')
    .get(getPostById)           // GET /api/posts/:id (Public)
    .put(protect, updatePost)   // PUT /api/posts/:id (Protected)
    .delete(protect, deletePost); // DELETE /api/posts/:id (Protected)

export default router;