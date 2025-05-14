const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  checkFollowExists
  // getFollowedPosts
} = require('../daos/followDao');
const axios = require('axios');


// Follow a user
const follow = (req, res) => {
  const followerId = req.user.id;
  const userId = req.params.id;

  if (parseInt(userId) === followerId) {
    return res.status(400).json({ error: "You can't follow yourself" });
  }

  followUser(userId, followerId, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ msg: 'User followed successfully' });
  });
};

// Unfollow a user
const unfollow = (req, res) => {
  const followerId = req.user.id;
  const userId = req.params.id;

  unfollowUser(userId, followerId, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ msg: 'User unfollowed successfully' });
  });
};

// Get followers
const getFollowersList = (req, res) => {
  const userId = req.params.id;
  getFollowers(userId, (err, followers) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(followers);
  });
};

// Get following
const getFollowingList = (req, res) => {
  const userId = req.params.id;
  getFollowing(userId, (err, following) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(following);
  });
};


const isFollowing = (req, res) => {
  const followerId = req.user.id;
  const userId = parseInt(req.params.id);

  if (userId === followerId) {
    return res.json({ isFollowing: false });  // can't follow yourself
  }

  checkFollowExists(userId, followerId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ isFollowing: result });
  });
};

const getFollowingFeed = async (userId, callback) => {
  getFollowing(userId, async (err, followings) => {
    if (err) return callback(err);

    const feed = [];

    for (const follow of followings) {
      const followedUserId = follow.userId;

      try {
        const res = await axios.get(`http://blog-service:5002/api/blogs/user/${followedUserId}`);
        if (res.status === 200) {
          feed.push(...res.data);
        }
      } catch (error) {
        console.warn(`Failed to fetch posts from user ${followedUserId}:`, error.message);
      }
    }

    // Sort posts by createdAt (if available)
    feed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    callback(null, feed);
  });
};




const fetchFollowers = (userId, callback) => {
  getFollowers(userId, async (err, rows) => {
    if (err) return callback(err);

    const userList = [];
    for (let row of rows) {
      try {
        const res = await axios.get(`http://auth-service:5001/api/auth/users/${row.followerId}`);
        userList.push({ id: row.followerId, username: res.data.username });
      } catch (e) {
        userList.push({ id: row.followerId, username: 'Unknown' });
      }
    }

    callback(null, userList);
  });
};

const fetchFollowings = (userId, callback) => {
  getFollowing(userId, async (err, rows) => {
    if (err) return callback(err);

    const userList = [];
    for (let row of rows) {
      try {
        const res = await axios.get(`http://auth-service:5001/api/auth/users/${row.userId}`);
        userList.push({ id: row.userId, username: res.data.username });
      } catch (e) {
        userList.push({ id: row.userId, username: 'Unknown' });
      }
    }

    callback(null, userList);
  });
};
module.exports = {
  follow,
  unfollow,
  getFollowersList,
  getFollowingList,
  getFollowingFeed,
  isFollowing,
  fetchFollowers,
  fetchFollowings
};
