const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const authRoutes =require('./routers/authRoutes');
const swaggerUi =require('swagger-ui-express');
const swaggerSpec = require('./config/swagger')

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);


// Default route
app.get('/', (req, res) => {
  res.send(' Welcome to TravelTales API');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
