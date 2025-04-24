const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TravelTales API',
      version: '1.0.0',
      description: 'API documentation for TravelTales',
    },
  },
  apis: ['./routers/*.js'], 
};

module.exports = swaggerJsdoc(options);