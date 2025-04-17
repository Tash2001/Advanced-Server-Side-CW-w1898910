const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('../config/database');
const UserDao = require('../dao/userDao');
const UserService = require('../service/userService');
const { error } = require('console');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { body, validationResult } = require('express-validator');

const userDao = new UserDao(db);
const userService = new UserService(userDao);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User registration, login and list
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    ], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const { name, email, password } = req.body;


    userService.register({ name, email, password }, (err, userId) => {
        if (err) return res.status(500).json({ message: 'Registration failed', error: err.message });
        res.status(201).json({ message: 'User registered Successfully', userId });
    });
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user and return API key
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const { email, password } = req.body;



    userService.login(email, password, (err, user) => {
        if (err) return res.status(401).json({ message: 'Login failed', error: err.message });

        //jwt
        const token = jwt.sign(
            { id: user.id, email: user.email , role: user.role || 'user' },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, name: user.name, email: user.email },
            token
        });
    });
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', (req, res) => {
    userDao.getAll((err, users) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(users);
    });
  });
  

/**
 * @swagger
 * /users/generate-key:
 *   post:
 *     summary: Generate an API key for authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: API key generated successfully
 */
router.post('/generate-key', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
      const apiKey = crypto.randomBytes(32).toString('hex');
  
      db.run('INSERT INTO api_keys (user_id, api_key) VALUES (?, ?)', [decoded.id, apiKey], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Could not generate API key' });
        }
        res.json({ apiKey });
      });
    } catch {
      res.status(401).json({ error: 'Invalid token' });
    }
  });
  
  module.exports = router;
  