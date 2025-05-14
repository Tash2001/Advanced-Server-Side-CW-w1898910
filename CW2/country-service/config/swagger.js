const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Country Service API',
      version: '1.0.0',
      description: 'Country dropdown & info for TravelTales',
    },
  },
  apis: ['./routers/*.js'],
};

module.exports = swaggerJsdoc(options);