const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const rateLimiter = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/error.middleware");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimiter);

// Routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/campaigns", require("./routes/campaign.routes"));

// Swagger
const specs = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Campaign API", version: "1.0.0" },
  },
  apis: ["./src/routes/*.js"],
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Error handler
app.use(errorHandler);

module.exports = app;