import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import './WriteBlog.css';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    title: '',
    content: '',
    dateOfVisit: '',
    country: ''
  });
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load countries
    axios.get('http://localhost:5005/api/countries')
      .then(res => setCountries(res.data.map(c => ({ label: c, value: c }))))
      .catch(() => setMessage('Failed to load countries'));

    // Load existing blog post
    axios.get(`http://localhost:5002/api/blogs/${id}`)
      .then(res => {
        const { title, content, dateOfVisit, country } = res.data;
        setForm({ title, content, dateOfVisit, country });
      })
      .catch(() => setMessage('Failed to load post'));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (selected) => {
    setForm({ ...form, country: selected ? selected.value : '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5002/api/blogs/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Post updated successfully!');
      setTimeout(() => navigate('/posts'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to update post');
    }
  };

  return (
    <div className="write-blog-container">
      <h2>Edit Blog Post</h2>
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
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: '#1e1e1e',
              borderColor: '#444',
              color: '#E0E0E0',
            }),
            singleValue: (base) => ({
              ...base,
              color: '#E0E0E0',
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: '#1e1e1e',
              color: '#E0E0E0',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#333' : '#1e1e1e',
              color: '#E0E0E0',
            }),
          }}
        />
        <button type="submit">Update</button>
      </form>
      {message && <p className="status">{message}</p>}
    </div>
  );
};

export default EditBlog;
