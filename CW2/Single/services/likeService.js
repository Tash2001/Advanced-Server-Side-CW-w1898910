const { insertLike, getLikeCounts } = require("../daos/likeDao");

const likePost = (req, res)=>{
    const userId = req.user.id;
    const postId = req.params.id;
    const type = 'like';

    insertLike(userId,postId,type,(err)=>{
        if(err) return res.status(500).json({error : err.message});
        res.json({msg:'Post liked'});

    });
};

const dislikePost = (req, res)=>{
    const userId = req.user.id;
    const postId = req.params.id;
    const type = 'dislike';

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

module.exports={
    likePost,
    dislikePost,
    getPostLikes
}