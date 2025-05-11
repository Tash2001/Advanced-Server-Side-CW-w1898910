import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './WriteBlog.css';

const WriteBlog = () => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    dateOfVisit: '',
    country: ''
  });
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5005/api/countries')
      .then(res => setCountries(res.data.map(c => ({ label: c, value: c }))))
      .catch(() => setMessage('Failed to load countries'));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (selected) => {
    setForm({ ...form, country: selected ? selected.value : '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5002/api/blogs', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Blog post created successfully!');
      setForm({ title: '', content: '', dateOfVisit: '', country: '' });
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to create post');
    }
  };

  return (
    <div className="write-blog-container">
      <h2>Write a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="write-blog-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          rows="6"
          value={form.content}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateOfVisit"
          value={form.dateOfVisit}
          onChange={handleChange}
          required
        />
        <Select
          options={countries}
          placeholder="Select Country"
          value={countries.find(c => c.value === form.country)}
          onChange={handleCountryChange}
          isClearable
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p className="status">{message}</p>}
    </div>
  );
};

export default WriteBlog;
