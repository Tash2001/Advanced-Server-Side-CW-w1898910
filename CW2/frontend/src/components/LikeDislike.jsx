import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LikeDislike.css';

const LikeDislike = ({ postId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [myVote, setMyVote] = useState(null); 
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCounts();
      fetchUserVote();

  }, []);

  const fetchCounts = async () => {
    try {
      const res = await axios.get(`http://localhost:5003/api/likes/${postId}`);
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    } catch (err) {
      console.error('Failed to fetch like counts', err);
    }
  };
  const fetchUserVote = async () => {
  try {
    const res = await axios.get(`http://localhost:5003/api/likes/${postId}/vote`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMyVote(res.data.vote); 
  } catch (err) {
    console.error('Failed to fetch user vote', err);
  }
};

  const handleVote = async (type) => {
    try {
      const endpoint = `http://localhost:5003/api/likes/${postId}/${type}`;
      await axios.post(endpoint, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyVote(type);
      fetchCounts();
    } catch (err) {
      console.error('Failed to vote', err);
    }
  };

  return (
    <div className="like-dislike">
      <img
        src={myVote === 'like' ? '/like-colored.png' : '/like.png'}
        alt="like"
        onClick={() => handleVote('like')}
        className="icon"
      />
      <span>{likes}</span>

      <img
        src={myVote === 'dislike' ? '/dislike-colored.png' : '/dislike.png'}
        alt="dislike"
        onClick={() => handleVote('dislike')}
        className="icon"
      />
      <span>{dislikes}</span>
    </div>
  );
};

export default LikeDislike;
