import axios from "axios";

const API_BASE = 'http://localhost:5000';

export const register = (user) => axios.post(`${API_BASE}/users/register`, user);
export const login = (credentials) => axios.post(`${API_BASE}/users/login`, credentials);

export const fetchCountry = (countryName, token,apiKey) => axios.get(
    `${API_BASE}/country/${countryName}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            'x-api-key': apiKey
        }
    }
);