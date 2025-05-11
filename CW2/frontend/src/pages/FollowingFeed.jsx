import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BrowseBlogs.css';
import LikeDislike from '../components/LikeDislike';


const FollowingFeed = () => {
  const [feed, setFeed] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get('http://localhost:5004/api/follow/feed/following', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFeed(res.data);
      } catch (err) {
        console.error('Failed to load feed', err);
        setError('Could not fetch feed');
      }
    };

    if (token) {
      fetchFeed();
    }
  }, [token]);

  return (
    <div className="browse-container">
      <h2>Posts from People You Follow</h2>
      {error && <p className="error">{error}</p>}

      <div className="results">
        {feed.length > 0 ? (
          feed.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p><strong>Country:</strong> {post.country}</p>
              <p><strong>Author:</strong> {post.username}</p>
              <p>{post.content}</p>
              <LikeDislike postId={post.id} />
            </div>
          ))
        ) : (
          <p>No posts found. Follow others to see their posts!</p>
        )}
      </div>
    </div>
  );
};

export default FollowingFeed;
