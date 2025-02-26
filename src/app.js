const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const { swaggerUi, swaggerSpec } = require("./config/swagger");

require("dotenv").config();
require("./config/swagger");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routes: Version 1
app.use("/api/v1", routes);

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler middleware (should be last)
app.use(errorHandler);

module.exports = app;
