import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FollowButton.css'

const FollowButton = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const token = localStorage.getItem('token');

  const checkFollowStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:5004/api/follow/isfollowing/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsFollowing(res.data.isFollowing);

    } catch (err) {
      console.error('Error checking follow status', err);
    }
  };

  useEffect(() => {
    if (userId) checkFollowStatus();
  }, [userId]);

  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.delete(`http://localhost:5004/api/follow/unfollow/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFollowing(false);
      } else {
        await axios.post(`http://localhost:5004/api/follow/${userId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFollowing(true);
      }
    } catch (err) {
      console.error('Follow/unfollow failed', err);
    }
  };

  return (
    <button className="follow-btn" onClick={toggleFollow}>
      {isFollowing ? ' - Unfollow ' : ' + Follow '}
    </button>
  );
};

export default FollowButton;
