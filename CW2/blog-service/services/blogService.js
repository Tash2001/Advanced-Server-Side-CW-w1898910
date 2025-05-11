const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getPostsUserId,
    searchPosts: searchPostsDao
} = require('../daos/blogDao');
const axios = require('axios');

const createBlogPost = (req, res) => {
    const { title, content, country, dateOfVisit } = req.body;
    const userId = req.user.id;

    if (!title || !content || !country || !dateOfVisit) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    createPost(title, content, country, dateOfVisit, userId, (err, postId) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ msg: 'Post Created Successfully', postId });
    });
};

const getUsernameById = async (userId) => {
    try {
        const res = await axios.get(`http://auth-service:5001/api/auth/${userId}`);
        return res.data.username;
    } catch {
        return 'Unknown';
    }
};

const fetchAllPosts = async (req, res) => {
    getAllPosts(async (err, posts) => {
        if (err) return res.status(500).json({ error: err.message });

        const enrichedPosts = await Promise.all(
            posts.map(async (post) => {
                const username = await getUsernameById(post.userId);
                return { ...post, username };
            })
        );

        res.json(enrichedPosts);
    });
};

const fetchPostById = (req, res) => {
    const postId = req.params.id;

    getPostById(postId, (err, post) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!post) return res.status(404).json({ error: 'Post not Found' });
        res.json(post);

    });
};

const updateBlogPost = (req, res) => {
    const postId = req.params.id;
    const { title, content, country, dateOfVisit } = req.body;

    if (!title || !content || !country || !dateOfVisit) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    updatePost(postId, title, content, country, dateOfVisit, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ msg: 'Post Updated Successfully' });
    });
};

const deleteBlogPost = (req, res) => {
    const postId = req.params.id;

    deletePost(postId, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ msg: 'Post Deleted Successfully' });
    });
};

//get posts of a specific user
const fetchuserPosts = (req, res) => {
    const userId = req.user?.id || req.params.id;

    getPostsUserId(userId, (err, posts) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(posts);
    });
};




const searchPosts = (req, res) => {
    const { country, user: username } = req.query;

    const filters = {
        country: country || null,
        username: username || null
    };

    searchPostsDao(filters, (err, posts) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(posts);
    });
}

module.exports = {
    createBlogPost,
    fetchAllPosts,
    fetchPostById,
    updateBlogPost,
    deleteBlogPost,
    fetchuserPosts,
    searchPosts
};

