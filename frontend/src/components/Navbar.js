import React from "react";
import { jwtDecode } from 'jwt-decode'; 


export default function Navbar({ loggedIn, onLogout, showAdminPanel, setShowAdminPanel }) {
    const token = localStorage.getItem('token');
    const decoded = token ? jwtDecode(token) : null;
    const isAdmin = decoded?.role === 'admin';

    return (
        <nav
        className="navbar navbar-expand-lg px-4"
        style={{
          background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
          color: '#fff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        }}
      >
        <span className="navbar-brand text-white fw-bold fs-4">
           RestCountries Secure App
        </span>
  
        <div className="ms-auto d-flex gap-2">
          {isAdmin && loggedIn && (
            <button
              className="btn btn-outline-warning fw-semibold"
              onClick={() => setShowAdminPanel(prev => !prev)}
            >
              {showAdminPanel ? 'Hide Admin Panel' : 'Admin Panel'}
            </button>

            
            
          )}
  
          {loggedIn && (
           
            <button className="btn btn-danger fw-semibold" onClick={onLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    );
}