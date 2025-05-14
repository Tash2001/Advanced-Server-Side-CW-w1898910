import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, username, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">TravelTales</h2>
      <div className="navbar-links">
        <Link to="/posts" className="navbar-link">Home</Link>
        {isLoggedIn ? (
          <>
            <Link className="navbar-link" to="/feed">Feed</Link>
            <Link className='navbar-link' to="/myposts">{username}</Link>
            <Link to="/write" className="navbar-link">Add Blog</Link>
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
