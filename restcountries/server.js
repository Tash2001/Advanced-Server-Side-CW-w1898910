const express = require('express');
const PORT = process.env.PORT || 5000;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const db = require('./src/config/database'); 
const userRoutes = require('./src/routes/userRoutes');
const countryRoutes = require('./src/routes/countryRoutes');



const app = express();
// Middleware to parse JSON
app.use(express.json());


const cors = require('cors');
app.use(cors());

// Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

app.use('/users', userRoutes);
app.use('/country', countryRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the RestCountries!' });
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
