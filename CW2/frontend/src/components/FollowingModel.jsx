import React from 'react';
import './UserListModal.css';
import FollowButton from './FollowButton';


const FollowingModal = ({ isOpen, following, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Following</h3>
        <ul>
          {following.length > 0 ? (
            following.map(user => (
              <li key={user.id}>@{user.username} 
              
               {<FollowButton userId={user.id} />}
               
               </li>
              
            ))
          ) : (
            <p>Not following anyone</p>
          )}
        </ul>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FollowingModal;
