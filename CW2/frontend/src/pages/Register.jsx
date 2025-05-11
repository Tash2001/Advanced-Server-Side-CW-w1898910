import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
   const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', form);
      setMessage(res.data.msg || 'Registered successfully!');
      navigate('/login');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <label>Email</label>
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <label>Password</label>
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p className="error">{message}</p>}
    </div>
  );
};

export default Register;
