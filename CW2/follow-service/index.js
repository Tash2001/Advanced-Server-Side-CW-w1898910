const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const followRoutes = require('./routers/followRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/follow', followRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Follow Service running at http://localhost:${PORT}`);
});
