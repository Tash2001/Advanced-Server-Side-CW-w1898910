const express = require('express');
const router = express.Router();
const { handleLike, handleDislike, handleGetLikes } = require('../controllers/likeController');
const verifyToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/likes/{id}/like:
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
 *         description: Blog post ID
 *     responses:
 *       200:
 *         description: Post liked
 *       404:
 *         description: Post not found in blog-service
 *       500:
 *         description: Internal server error
 */
router.post('/:id/like', verifyToken, handleLike);

/**
 * @swagger
 * /api/likes/{id}/dislike:
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
 *         description: Blog post ID
 *     responses:
 *       200:
 *         description: Post disliked
 *       404:
 *         description: Post not found in blog-service
 *       500:
 *         description: Internal server error

 */
router.post('/:id/dislike', verifyToken, handleDislike);

/**
 * @swagger
 * /api/likes/{id}:
 *   get:
 *     summary: Get like/dislike count of a blog post
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Like/dislike count
 */
router.get('/:id', handleGetLikes);

module.exports = router;
