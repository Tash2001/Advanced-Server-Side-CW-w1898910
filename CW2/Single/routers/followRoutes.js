const express = require('express');
const router = express.Router();
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
  getFollowingPosts
} = require('../controllers/followController');
const verifyToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: Follow and unfollow users
 */

/**
 * @swagger
 * /api/follow/{id}:
 *   post:
 *     summary: Follow a user
 *     tags: [Follow]
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
 *         description: Followed user
 */
router.post('/:id', verifyToken, followUser);

/**
 * @swagger
 * /api/follow/unfollow/{id}:
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Follow]
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
 *         description: Unfollowed user
 */
router.delete('/unfollow/:id', verifyToken, unfollowUser);

/**
 * @swagger
 * /api/follow/followers/{id}:
 *   get:
 *     summary: Get a user's followers
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of followers
 */
router.get('/followers/:id', getFollowers);

/**
 * @swagger
 * /api/follow/following/{id}:
 *   get:
 *     summary: Get users that a user is following
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of followings
 */
router.get('/following/:id', getFollowings);

/**
 * @swagger
 * /api/follow/feed/following:
 *   get:
 *     summary: Get blog posts from followed users
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Posts from followed users
 */
router.get('/feed/following', verifyToken, getFollowingPosts);

module.exports = router;
