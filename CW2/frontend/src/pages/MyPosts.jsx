import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyPosts.css';
import { useNavigate } from 'react-router-dom';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const userId = JSON.parse(atob(token.split('.')[1]))?.id;
  const navigate = useNavigate();

    const fetchPosts = () => {
        axios
            .get('http://localhost:5002/api/blogs/user/myposts', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setPosts(res.data))
            .catch(() => setError('Failed to load your blog posts'));

    };

    const fetchFollowStats = () => {
    axios
      .get(`http://localhost:5004/api/follow/followers/${userId}`)
      .then((res) => setFollowers(res.data.length))
      .catch(() => setFollowers(0));

    axios
      .get(`http://localhost:5004/api/follow/following/${userId}`)
      .then((res) => setFollowing(res.data.length))
      .catch(() => setFollowing(0));
  };

    useEffect(() => {
        fetchPosts();
        fetchFollowStats();
    }, []);

    const handleDelete = async (postId) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        try {
            await axios.delete(`http://localhost:5002/api/blogs/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },

            });
            setMessage('Post deleted successfuly');
            fetchPosts();
        } catch {
            setError('Failed to delete post')
        }
    };

    const handleEdit = (postId) => {
        navigate(`/edit/${postId}`);
    };

    return (
        <div className="myposts-container">
                  <div className="stats-bar">
        <div className="stat-card"> <strong>{posts.length}</strong><br />Posts</div>
        <div className="stat-card"> <strong>{followers}</strong><br />Followers</div>
        <div className="stat-card"> <strong>{following}</strong><br />Following</div>
      </div>
            <h2>My Blog Posts</h2>
            {message && <p className='success'> {message}</p>}
            {error && <p className="error">{error}</p>}
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="mypost-card">
                        <h3>{post.title}</h3>
                        <p><strong>Country:</strong> {post.country}</p>
                        <p><strong>Date of Visit:</strong> {post.dateOfVisit}</p>
                        <p>{post.content}</p>
                        <div className='button-row'>
                            <button className='edit-btn' onClick={() => handleEdit(post.id)}>Edit</button>
                            <button className='delete-btn' onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No blog posts found.</p>
            )}
        </div>
    );
};

export default MyPosts;
