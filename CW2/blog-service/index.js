const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
dotenv.config();

const blogRoutes = require('./routers/blogRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(` Blog Service running on http://localhost:${PORT}`);
});
