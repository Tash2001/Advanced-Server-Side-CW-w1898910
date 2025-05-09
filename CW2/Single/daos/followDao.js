const db = require('../config/db');

// Follow a user
const followUser = (userId, followerId, callback) => {
  const sql = `
    INSERT OR IGNORE INTO followers (userId, followerId)
    VALUES (?, ?)
  `;
  db.run(sql, [userId, followerId], callback);
};

// Unfollow a user
const unfollowUser = (userId, followerId, callback) => {
  const sql = `
    DELETE FROM followers
    WHERE userId = ? AND followerId = ?
  `;
  db.run(sql, [userId, followerId], callback);
};

// Get followers of a user
const getFollowers = (userId, callback) => {
  const sql = `
    SELECT users.id, users.username
    FROM followers
    JOIN users ON followers.followerId = users.id
    WHERE followers.userId = ?
  `;
  db.all(sql, [userId], callback);
};

// Get followings of a user
const getFollowing = (userId, callback) => {
  const sql = `
    SELECT users.id, users.username
    FROM followers
    JOIN users ON followers.userId = users.id
    WHERE followers.followerId = ?
  `;
  db.all(sql, [userId], callback);
};

// Get posts from followed users
const getFollowedPosts = (userId, callback) => {
  const sql = `
    SELECT posts.*, users.username
    FROM posts
    JOIN users ON posts.userId = users.id
    WHERE userId IN (
      SELECT userId FROM followers WHERE followerId = ?
    )
    ORDER BY posts.createdAt DESC
  `;
  db.all(sql, [userId], callback);
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getFollowedPosts
};
