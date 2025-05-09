const {
    likePost,
    dislikePost,
    getPostLikes
} = require('../services/likeService')

const handleLike = (req,res)=>{
    likePost(req,res);
};

const handleDislike =(req,res)=>
{
    dislikePost(req,res);

};

const handleGetLikes = (req, res) => {
    getPostLikes(req, res);
  };
  
  module.exports = {
    handleLike,
    handleDislike,
    handleGetLikes
  };