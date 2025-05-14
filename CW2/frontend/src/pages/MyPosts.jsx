import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyPosts.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FollowerModal from '../components/FollowerModel';
import FollowingModal from '../components/FollowingModel';



const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    const userId = JSON.parse(atob(token.split('.')[1]))?.id;
    const navigate = useNavigate();
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [showReset, setShowReset] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetMessage, setResetMessage] = useState('');


    const fetchPosts = () => {
        axios
            .get('http://localhost:5002/api/blogs/user/myposts', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setPosts(res.data))
            .catch(() => setError('Failed to load your blog posts'));

    };

    const openFollowers = async () => {
        const res = await axios.get(`http://localhost:5004/api/follow/users/followers/${userId}`);
        setFollowerList(res.data);
        setShowFollowers(true);
    };

    const openFollowing = async () => {
        const res = await axios.get(`http://localhost:5004/api/follow/users/following/${userId}`);
        setFollowingList(res.data);
        setShowFollowing(true);
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

    const handleResetPassword = async () => {
        try {
            const res = await axios.post('http://localhost:5001/api/auth/reset-password', {
                currentPassword,
                newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setResetMessage(res.data.msg || 'Password updated!');
            setCurrentPassword('');
            setNewPassword('');
        } catch (err) {
            setResetMessage(err.response?.data?.error || 'Password reset failed.');
        }
    };

    return (
        <div className="myposts-container">
            <div className="stats-bar">
                <div className="stat-card"> <strong>{posts.length}</strong><br />Posts</div>
                <div className="stat-card">
                    <strong>{followers}</strong><br />
                    <span onClick={openFollowers} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Followers</span>
                </div>
                <div className="stat-card">
                    <strong>{following}</strong><br />
                    <span onClick={openFollowing} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Following</span>
                </div>
            </div>
            <FollowerModal isOpen={showFollowers} followers={followerList} onClose={() => setShowFollowers(false)} />
            <FollowingModal isOpen={showFollowing} following={followingList} onClose={() => setShowFollowing(false)} />
            <button onClick={() => setShowReset(true)} className="reset-pass-btn">
                Reset Password
            </button>
            {showReset && (
                <div className="reset-pass-form">
                    <h3>Reset Your Password</h3>
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={handleResetPassword}>Submit</button>
                    <button onClick={() => setShowReset(false)}>Cancel</button>
                    {resetMessage && <p>{resetMessage}</p>}
                </div>
            )}

            <h2>My Blog Posts</h2>
            {message && <p className='success'> {message}</p>}
            {error && <p className="error">{error}</p>}
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="mypost-card">
                        <h3>{post.title}</h3>
                        <p>
                            <strong>Country:</strong>{' '}
                            <Link to={`/country/${encodeURIComponent(post.country)}`} className="country-link">
                                {post.country}
                            </Link>
                        </p>                        <p><strong>Date of Visit:</strong> {post.dateOfVisit}</p>
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
