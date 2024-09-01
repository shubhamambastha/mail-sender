const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Email Sending API",
    version: "1.0.0",
    description: "API for sending emails via Gmail using OAuth2 and Nodemailer",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/routes/*.js", "./src/controllers/*.js"], // Look for API definitions in route and controller files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
