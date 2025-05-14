const express = require('express');
const fetch = require('node-fetch');
const checkApiKey = require('../middleware/checkApiKey');
const verifyJWT = require('../middleware/verifyJWT');
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Country
 *   description: Country info access (protected)
 */


// Protected country info route
/**
 * @swagger
 * /country/{name}:
 *   get:
 *     summary: Get country info (API key required)
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Country name
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       200:
 *         description: Country data retrieved
 *       401:
 *         description: API key missing
 *       403:
 *         description: Invalid API key
 *       404:
 *         description: Country not found
 */
// router.get('/:name', checkApiKey, async (req, res) => {
router.get('/:name', checkApiKey, async (req, res) => {

  const countryName = req.params.name;

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`);
    if (!response.ok) return res.status(404).json({ message: 'Country not found' });

    const data = await response.json();
    const country = data[0];

    const result = {
      name: country.name.common,
      capital: country.capital?.[0] || 'N/A',
      currencies: Object.values(country.currencies || {})[0]?.name || 'N/A',
      languages: Object.values(country.languages || []).join(', ') || 'N/A',
      flag: country.flags?.png || 'N/A'
    };

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching country info' });
  }
});

module.exports = router;
