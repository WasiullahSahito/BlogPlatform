import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    // The 'author' is available from the 'protect' middleware (req.user)
    const post = new Post({
        title,
        content,
        author: req.user._id,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
});

// @desc    Get all non-deleted posts
// @route   GET /api/posts
// @access  Public
const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ isDeleted: false })
        .populate('author', 'username') // Populate author with only the username
        .sort({ createdAt: -1 }); // Sort by newest first
    res.json(posts);
});

// @desc    Get a single non-deleted post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author', 'username');

    if (post && !post.isDeleted) {
        res.json(post);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});

// @desc    Update own blog post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post || post.isDeleted) {
        res.status(404);
        throw new Error('Post not found');
    }

    // Authorization Check: Ensure the logged-in user is the post owner
    if (post.author.toString() !== req.user._id.toString()) {
        res.status(403); // 403 Forbidden
        throw new Error('User not authorized to update this post');
    }

    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
});

// @desc    Soft delete own blog post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post || post.isDeleted) {
        res.status(404);
        throw new Error('Post not found');
    }

    // Authorization Check: Ensure the logged-in user is the post owner
    if (post.author.toString() !== req.user._id.toString()) {
        res.status(403); // 403 Forbidden
        throw new Error('User not authorized to delete this post');
    }

    post.isDeleted = true;
    await post.save();

    res.json({ message: 'Post removed successfully' });
});

export { createPost, getAllPosts, getPostById, updatePost, deletePost };