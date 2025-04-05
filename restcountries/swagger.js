const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coursework 1 API',
      version: '1.0.0',
      description: 'API documentation for CW1 using Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./server.js'], // Path route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
