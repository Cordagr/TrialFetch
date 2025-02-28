const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const trailRoutes = require("./routes/trailRoutes");

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
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

// Define the port to listen on
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export the app
module.exports = app;