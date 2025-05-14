const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const likeRoutes = require('./routers/likeRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/likes', likeRoutes);


const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Like Service running on http://localhost:${PORT}`);
});
