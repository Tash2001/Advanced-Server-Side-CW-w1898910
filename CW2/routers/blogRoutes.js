const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  getUserPosts
} = require('../controllers/blogController');
const verifyToken = require('../middleware/authMiddleware'); 

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog post management routes
 */

// Create a blog post (protected)
router.post('/', verifyToken, createPost);

// Get all blog posts (public)
router.get('/', getAllPosts);

// Get a single blog post by ID (public)
router.get('/:id', getPostById);

// Update a blog post (protected)
router.put('/:id', verifyToken, updatePostById);

// Delete a blog post (protected)
router.delete('/:id', verifyToken, deletePostById);

// Get posts created by logged-in user (protected)
router.get('/user/myposts', verifyToken, getUserPosts);

module.exports = router;
