const express = require('express');
const router = express.Router();
const { getAllCountries, getCountryInfo } = require('../controllers/countryController');

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: Get all countries and detailed country info
 */

/**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Get all countries for dropdown
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
 *     summary: Get detailed info about a country
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Country flag, capital, currency
 */
router.get('/:name', getCountryInfo);

module.exports = router;
