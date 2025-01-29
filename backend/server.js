require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const redoc = require("redoc-express");
const authRoutes = require("./routes/auth");
const carRoutes = require("./routes/cars");

const app = express();

const corsOptions = {
  origin: process.env.VITE_API, // Allow frontend URL
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Car Management API",
      version: "1.0.0",
      description: "API documentation for the Car Management application",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Serve Redoc
app.get(
  "/api/docs",
  redoc({
    title: "API Docs",
    specUrl: "/api/swagger.json",
  })
);

// Serve swagger spec
app.get("/api/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
