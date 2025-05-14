import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BrowseBlogs.css';

const BrowseBlogs = () => {
  const [countries, setCountries] = useState([]);
  const [filters, setFilters] = useState({ country: '', user: '' });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5005/api/countries')
      .then(res => setCountries(res.data))
      .catch(() => setError('Failed to load countries'));
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`http://localhost:5002/api/blogs/search?${query}`);
      setResults(res.data);
      setError('');
    } catch {
      setResults([]);
      setError('Search failed');
    }
  };

  return (
    <div className="browse-container">
      <h2>Browse Travel Blogs</h2>
      <form onSubmit={handleSearch} className="browse-form">
        <select name="country" value={filters.country} onChange={handleChange}>
          <option value="">-- Select Country --</option>
          {countries.map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>

        <input
          type="text"
          name="user"
          placeholder="Search by username"
          value={filters.user}
          onChange={handleChange}
        />

        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="results">
        {results.length > 0 ? (
          results.map(post => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p><strong>Country:</strong> {post.country}</p>
              <p><strong>Author:</strong> {post.username}</p>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No results to show</p>
        )}
      </div>
    </div>
  );
};

export default BrowseBlogs;
