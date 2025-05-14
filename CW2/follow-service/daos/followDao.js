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
  const sql = `SELECT followerId FROM followers WHERE userId = ?`;
  db.all(sql, [userId], callback);
};

// Get followings of a user
const getFollowing = (userId, callback) => {
  const sql = `SELECT userId FROM followers WHERE followerId = ?`;
  db.all(sql, [userId], callback);
};

const checkFollowExists = (targetUserId, followerId, callback) => {
  const sql = `SELECT 1 FROM followers WHERE userId = ? AND followerId = ?`;
  db.get(sql, [targetUserId, followerId], (err, row) => {
    callback(err, !!row);  
  });
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  checkFollowExists
  // getFollowedPosts
};
