const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const authRoutes =require('./routers/authRoutes');
const swaggerUi =require('swagger-ui-express');
const swaggerSpec = require('./config/swagger')
const blogRoutes = require('./routers/blogRoutes');
const likeRoutes = require('./routers/likeRoutes');
const countryRoutes = require('./routers/countryRoutes');
const followRoutes = require('./routers/followRoutes');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);


// Default route
app.get('/', (req, res) => {
  res.send(' Welcome to TravelTales API');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/posts',likeRoutes);

app.use('/api/countries',countryRoutes);

app.use('/api/follow', followRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
