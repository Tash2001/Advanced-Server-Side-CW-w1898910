import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', form);
      const token = res.data.token;
      localStorage.setItem('token', token);
      onLogin(token);
      setMessage('Login successful!');
      navigate('/posts');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <label>Password</label>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" >Login</button>
      </form>
      {message && <p className="error">{message}</p>}
    </div>
  );
};

export default Login;
