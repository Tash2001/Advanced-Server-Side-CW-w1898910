const {
    follow,
    unfollow,
    getFollowersList,
    getFollowingList,
    getFollowingFeed
  } = require('../services/followService');
  
  // Controller for follow
  const followUser = (req, res) => {
    follow(req, res);
  };
  
  // Controller for unfollow
  const unfollowUser = (req, res) => {
    unfollow(req, res);
  };
  
  // Controller to get followers
  const getFollowers = (req, res) => {
    getFollowersList(req, res);
  };
  
  // Controller to get followings
  const getFollowings = (req, res) => {
    getFollowingList(req, res);
  };
  
  // Controller for feed of followed users
  const getFollowingPosts = (req, res) => {
    const userId = req.user.id;
  
    getFollowingFeed(userId, (err, posts) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(posts);
    });
  };
  
  module.exports = {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowings,
    getFollowingPosts
  };
  