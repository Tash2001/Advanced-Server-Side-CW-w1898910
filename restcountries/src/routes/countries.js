const express = require('express');
const axios = require('axios');
const db = require('../config/database');

const router = express.Router();

// Middleware to verify API key
router.use(async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) return res.status(403).json({ error: 'API key required' });

    db.get('SELECT * FROM api_keys WHERE api_key = ?', [apiKey], (err, key) => {
        if (!key) return res.status(403).json({ error: 'Invalid API key' });
        next();
    });
});

// Fetch country data
router.get('/:country', async (req, res) => {
    try {
        const { country } = req.params;
        const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
        const data = response.data[0];

        res.json({
            name: data.name.common,
            currency: Object.values(data.currencies || {})[0]?.name || 'N/A',
            capital: data.capital?.[0] || 'N/A',
            languages: Object.values(data.languages || {}).join(', '),
            flag: data.flags?.png || ''
        });
    } catch {
        res.status(500).json({ error: 'Error fetching country data' });
    }
});

module.exports = router;
