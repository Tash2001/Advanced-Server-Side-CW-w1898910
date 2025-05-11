const { insertLike, getLikeCounts, getUserVoteForPost } = require("../daos/likeDao");
const {postExists} =require('../utils/postValidator')

const likePost = async (req, res)=>{
    const userId = req.user.id;
    const postId = req.params.id;
    const type = 'like';

    const exixts = await postExists(postId);
    if(!exixts) return res.status(404).json({error:'Post not found in blog-service'});
    
    insertLike(userId,postId,type,(err)=>{
        if(err) return res.status(500).json({error : err.message});
        res.json({msg:'Post liked'});

    });
};

const dislikePost = async (req, res)=>{
    const userId = req.user.id;
    const postId = req.params.id;
    const type = 'dislike';

    const exists = await postExists(postId);
    if (!exists) return res.status(404).json({ error: 'Post not found in blog-service' });
    
    insertLike(userId,postId,type,(err)=>{
        if(err) return res.status(500).json({error : err.message});
        res.json({msg:'Post disliked'});

    });
};

const getPostLikes = (req,res)=> {
    const postId = req.params.id;
    getLikeCounts(postId,(err,results)=>{
        if(err) return res.status(500).json({error:err.message});
        res.json(results);
    });
};

const fetchUserVote = (userId, postId, callback) => {
  getUserVoteForPost(userId, postId, (err, row) => {
    if (err) return callback(err);
    callback(null, row ? row.type : null);
  });
};

module.exports={
    likePost,
    dislikePost,
    getPostLikes,
    fetchUserVote
}