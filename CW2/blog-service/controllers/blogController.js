
const {
    createBlogPost,
    fetchAllPosts,
    fetchPostById,
    updateBlogPost,
    deleteBlogPost,
    fetchuserPosts,
    
    searchPosts: searchPostsService
  } = require('../services/blogService');
  
  // Controller for creating a blog post
  const createPost = (req, res) => {
    createBlogPost(req, res);
  };
  
  // Controller for fetching all blog posts
  const getAllPosts = (req, res) => {
    fetchAllPosts(req, res);
  };
  
  // Controller for fetching a single blog post by ID
  const getPostById = (req, res) => {
    fetchPostById(req, res);
  };
  
  // Controller for updating a blog post
  const updatePostById = (req, res) => {
    updateBlogPost(req, res);
  };
  
  // Controller for deleting a blog post
  const deletePostById = (req, res) => {
    deleteBlogPost(req, res);
  };
  
  const getUserPosts = (req, res) => {
    fetchuserPosts(req, res);
  };
  


  const searchPosts = (req, res)=>{
    searchPostsService(req,res);
  };
  
  module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById,
    fetchuserPosts,
    getUserPosts,   
    searchPosts
  };
  