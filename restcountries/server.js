require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
    res.send('Welcome to the RestCountries');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const authRoutes = require('./src/routes/auth');
const countryRoutes = require('./src/routes/countries');

app.use('/auth', authRoutes);
app.use('/countries', countryRoutes);
