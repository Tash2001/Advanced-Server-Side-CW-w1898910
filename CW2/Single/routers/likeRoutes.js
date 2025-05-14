const express = require('express');
const router = express.Router();
const { handleLike, handleDislike, handleGetLikes } = require('../controllers/likeController');
const verifyToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Like/Dislike system for blog posts
 */

/**
 * @swagger
 * /api/posts/{id}/like:
 *   post:
 *     summary: Like a blog post
 *     tags: [Likes]
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
 *         description: Post liked
 */
router.post('/:id/like', verifyToken, handleLike);

/**
 * @swagger
 * /api/posts/{id}/dislike:
 *   post:
 *     summary: Dislike a blog post
 *     tags: [Likes]
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
 *         description: Post disliked
 */
router.post('/:id/dislike', verifyToken, handleDislike);

/**
 * @swagger
 * /api/posts/{id}/likes:
 *   get:
 *     summary: Get like/dislike count for a post
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Like/dislike count retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes:
 *                   type: integer
 *                 dislikes:
 *                   type: integer
 */
router.get('/:id/likes', handleGetLikes);

module.exports = router;
