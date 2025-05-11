import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './BrowseBlogs.css';
import FollowButton from '../components/FollowButton';
import LikeDislike from '../components/LikeDislike';

const BrowseBlogs = ({ isLoggedIn, myusername }) => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [username, setUsername] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [likesData, setLikesData] = useState({});


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

    useEffect(() => {
        const fetchLikes = async () => {
            const likeMap = {};
            for (const post of results) {
                try {
                    const res = await axios.get(`http://localhost:5003/api/likes/${post.id}`);
                    likeMap[post.id] = res.data;
                } catch {
                    likeMap[post.id] = { likes: 0, dislikes: 0 };
                }
            }
            setLikesData(likeMap);
        };

        if (results.length > 0) {
            fetchLikes();
        }
    }, [results]);

    const handleSearch = async (e) => {
        e.preventDefault();

        const country = selectedCountry?.value || '';
        const user = username;

        // If both fields are empty, reload all
        if (!country && !user) {
            fetchAllPosts();
            return;
        }

        try {
            const query = new URLSearchParams({
                ...(country && { country }),
                ...(user && { user })
            }).toString();

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

                {/* Country Dropdown */}
                <Select
                    options={countries}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    isClearable
                    placeholder="Select or type a country"
                    className="country-select"
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

                {/* Username Input */}
                <input
                    type="text"
                    placeholder="Search by username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                            {isLoggedIn ? (<p>
                                <strong>Author:</strong> {post.username}
                                {post.username !== myusername && <FollowButton userId={post.userId} />}
                            </p>
                            ) : (<p><strong>Author:</strong> {post.username}</p>)}

                            <p>{post.content}</p>
                            <p><strong>Likes:</strong> {likesData[post.id]?.likes || 0}</p>
                            <p><strong>Dislikes:</strong> {likesData[post.id]?.dislikes || 0}</p>
                            <LikeDislike postId={post.id} />


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
