const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('../config/database');
const UserDao = require('../dao/userDao');
const UserService = require('../service/userService');
const { error } = require('console');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
router.post('/register', (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });

    }

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
router.post('/login', (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });

    }

    userService.login(email, password, (err, user) => {
        if (err) return res.status(401).json({ message: 'Login failed', error: err.message });

        //jwt
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
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

// Get all users
router.get('/', (req, res) => {
    userDao.getAll((err, users) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(users);
    });
});

module.exports = router;