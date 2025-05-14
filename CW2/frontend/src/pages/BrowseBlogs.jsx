import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './BrowseBlogs.css';
import FollowButton from '../components/FollowButton';
import LikeDislike from '../components/LikeDislike';
import { Link } from 'react-router-dom';


const BrowseBlogs = ({ isLoggedIn, myusername }) => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [username, setUsername] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 5;



    // Pagination 
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(results.length / postsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Fetch countries and all posts on first load
    useEffect(() => {
        axios.get('http://localhost:5005/api/countries')
            .then(res => {
                const countryOptions = res.data.map(c => ({ value: c, label: c }));
                setCountries(countryOptions);
            })
            .catch(() => setError('Failed to load countries'));

        fetchAllPosts();
    }, []);

    const fetchAllPosts = async () => {
        try {
            const res = await axios.get('http://localhost:5002/api/blogs');
            setResults(res.data);
        } catch {
            setError('Failed to load blogs');
        }
    };

    const searchByCountry = async () => {
        if (!selectedCountry) return;
        try {
            const res = await axios.get(`http://localhost:5002/api/blogs/country/${encodeURIComponent(selectedCountry.value)}`);
            setResults(res.data);
            setError('');
        } catch {
            setError('No blogs found for this country');
        }
    };

    const searchByUsername = async () => {
        if (!username) return;
        try {
            const res = await axios.get(`http://localhost:5002/api/blogs/username/${encodeURIComponent(username)}`);
            setResults(res.data);
            setError('');
        } catch {
            setError('No blogs found for this user');
        }
    };

    const reset = () => {
        setUsername('');
        setSelectedCountry(null);
        setError('');
        fetchAllPosts();
    };
    return (
        <div className="browse-container">
            <h2>Browse Travel Blogs</h2>
            <div className="search-section">
                <div className="search-block">
                    <label>Search by Country</label>
                    <Select
                        options={countries}
                        value={selectedCountry}
                        onChange={setSelectedCountry}
                        isClearable
                        className="country-select"
                        placeholder="Select a country"
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
                    <button onClick={searchByCountry}>Search</button>
                </div>

                <div className="search-block">
                    <label>Search by Username</label>
                    <input
                        type="text"
                        className="text-input"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={searchByUsername}>Search</button>
                </div>
                <div className="search-block">
                    <button onClick={reset} className="reset-btn">Reset All</button>
                </div>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="results">
                {results.length > 0 ? (
                    currentPosts.map(post => (
                        <div key={post.id} className="post-card">
                            <h3>{post.title}</h3>
                            <p>
                                <strong>Country:</strong>{' '}
                                <Link to={`/country/${encodeURIComponent(post.country)}`} className="country-link">
                                    {post.country}
                                </Link>
                            </p>

                            {isLoggedIn ? (
                                <p>
                                    <strong>Author:</strong> {post.username || username}
                                    {(post.username || username) !== myusername && <FollowButton userId={post.userId} />}
                                </p>
                            ) : (<p><strong>Author:</strong> {post.username}</p>)}
                            <p><strong>Date of Visit: </strong>{post.dateOfVisit}</p>

                            <p>{post.content}</p>
                            <LikeDislike postId={post.id} />


                        </div>
                    ))
                ) : (
                    <p>No results to show</p>
                )}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

        </div>




    );
};

export default BrowseBlogs;
