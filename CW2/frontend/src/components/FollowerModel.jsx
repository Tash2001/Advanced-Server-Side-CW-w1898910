import React from 'react';
import './UserListModal.css';
import FollowButton from './FollowButton';

const FollowerModal = ({ isOpen, followers, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h3>Followers</h3>
                <ul>
                    {followers.length > 0 ? (
                        followers.map(user => (
                            <li key={user.id}>@{user.username}
                                {<FollowButton userId={user.id} />}
                            
                            </li>
                        ))
                    ) : (
                        <p>No followers</p>
                    )}
                </ul>
                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default FollowerModal;
