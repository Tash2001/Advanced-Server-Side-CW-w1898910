const {
    likePost,
    dislikePost,
    getPostLikes,
    fetchUserVote 
} = require('../services/likeService')

const handleLike = (req, res) => {
    likePost(req, res);
};

const handleDislike = (req, res) => {
    dislikePost(req, res);

};

const handleGetLikes = (req, res) => {
    getPostLikes(req, res);
};

const getUserVote = (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;

    fetchUserVote(userId, postId, (err, voteType) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ vote: voteType });
    });
};
module.exports = {
    handleLike,
    handleDislike,
    handleGetLikes,
    getUserVote
};