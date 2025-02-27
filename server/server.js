const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const app = express();

// Import routes
const authRoutes = require("./routes/authRoutes");
const trailRoutes = require("./routes/trailRoutes");
const userRoutes = require("./routes/user");

const allowedOrigins = ['http://localhost:3000', 'https://trail-fetch.vercel.app', 'https://www.trail-fetch.vercel.app'];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Connect to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected :)"))
  .catch((err) => console.log("Database Not Connected :(", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trails", trailRoutes);
app.use("/api/users", userRoutes);

// Debug endpoint
app.get("/api/debug", (req, res) => {
  res.json({ status: "ok", message: "API is working", timestamp: new Date().toISOString() });
});

// Add a test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Export the app
module.exports = app;
