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

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content, country, dateOfVisit]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               country:
 *                 type: string
 *               dateOfVisit:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post('/', verifyToken, createPost);

// Get all blog posts (public)
/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Returns a list of all blog posts
 */
router.get('/', getAllPosts);

// Get a single blog post by ID (public)
/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a single blog post by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blog post found
 *       404:
 *         description: Post not found
 */
router.get('/:id', getPostById);

// Update a blog post (protected)
/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content, country, dateOfVisit]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               country:
 *                 type: string
 *               dateOfVisit:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 */
router.put('/:id', verifyToken, updatePostById);

// Delete a blog post (protected)
/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post deleted successfully
 */
router.delete('/:id', verifyToken, deletePostById);

// Get posts created by logged-in user (protected)
/**
 * @swagger
 * /api/blogs/user/myposts:
 *   get:
 *     summary: Get posts of the logged-in user
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of user's blog posts
 */
router.get('/user/myposts', verifyToken, getUserPosts);

module.exports = router;
