const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const PORT = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const db = require('./src/config/database'); 
const UserDao = require('./src/dao/userDao')
const UserService = require('./src/service/userService')
const crypto = require('crypto'); 
const fetch = require('node-fetch');
const checkApiKey = require('./src/middleware/checkApiKey')

const app = express();
// Middleware to parse JSON
app.use(express.json());

const userDao = new UserDao(db);
const userService = new UserService(userDao);

// Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the RestCountries!' });
});



/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
app.get('/users', (req, res) => {
    userDao.getAll((err, users)=>{
        if(err) return res.status(500).json({error:err.message});
        res.json(users);
    });
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Name
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
app.put('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });

    users[index] = { ...users[index], ...req.body };
    res.json({ message: 'User updated successfully', user: users[index] });
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });

    const deleted = users.splice(index, 1);
    res.json({ message: 'User deleted successfully', user: deleted[0] });
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const user = { name, email, password };
  
    userService.register(user, (err, userId) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Registration failed', error: err.message });
      }
  
      res.status(201).json({ message: 'User registered successfully', userId });
    });
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
  
    userService.login(email, password, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(401).json({ message: 'Login failed', error: err.message });
      }

      const apiKey = crypto.randomUUID();

      const sql = `INSERT INTO api_keys (user_id, api_key) VALUES(?,?)`;
      db.run(sql, [user.id, apiKey], function(err){

        if(err){
          console.err(err);
          return res.status(500).json({message: 'Failed to generate API Key'});
        }

        return res.status(200).json({

          message: 'Login successful',
          user: { id: user.id, name:user.name, email: user.email},
          api_key: apiKey
        });
      });
    });
});
  
 /**
 * @swagger
 * /country/{name}:
 *   get:
 *     summary: Get country info (protected by API key)
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the country to look up
 *     responses:
 *       200:
 *         description: Country details
 *       401:
 *         description: Missing or invalid API key
 */
app.get('/country/:name', checkApiKey, async (req, res) => {
  const countryName = req.params.name;

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);

    if (!response.ok) {
      return res.status(404).json({ message: 'Country not found' });
    }

    const data = await response.json();
    const country = data[0];

    // Extract needed fields
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


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});



// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
