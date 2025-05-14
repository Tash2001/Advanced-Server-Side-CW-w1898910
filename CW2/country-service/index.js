const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const countryRoutes = require('./routers/countryRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/countries', countryRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Country Service running at http://localhost:${PORT}`);
});