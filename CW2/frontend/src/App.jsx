import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import BrowseBlogs from './pages/BrowseBlogs';
import Write from './pages/writeBlog';
import MyPosts from './pages/MyPosts';
import EditBlog from './pages/EditBlog';
import { jwtDecode } from 'jwt-decode';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    localStorage.setItem('token', token || '');
  }, [token]);

  const [username, setUsername] = useState(() => {

    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.username;

      } catch (err) {
        return null;
      }
    }
    return null;
  });





  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Navbar isLoggedIn={!!token} username={username} onLogout={handleLogout} />
      <Routes>
        <Route path="/*" element={<BrowseBlogs isLoggedIn={!!token} myusername={username} />} />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<BrowseBlogs isLoggedIn={!!token} myusername={username} />} />
        <Route path="/write" element={<Write />} />
        <Route path='/myposts' element={<MyPosts />} />
        <Route path='/edit/:id' element={<EditBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
