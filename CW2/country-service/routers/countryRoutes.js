const express = require('express');
const router = express.Router();
const {
  getAllCountries,
  getCountryDetails
} = require('../controllers/countryController');

/**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Get all country names
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: List of countries
 */
router.get('/', getAllCountries);

/**
 * @swagger
 * /api/countries/{name}:
 *   get:
 *     summary: Get details for a specific country
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the country
 *     responses:
 *       200:
 *         description: Country details
 */
router.get('/:name', getCountryDetails);

module.exports = router;