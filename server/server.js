const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// Import routes
const authRoutes = require("./routes/authRoutes");
const trailRoutes = require("./routes/trailRoutes");


// Middleware
app.use(
  cors({
    origin: "https://trail-fetch.vercel.app",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
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
app.use("/", authRoutes);
app.use("/trail-routes", trailRoutes);;
// (Add later for users) app.use("/api", postRoutes);


app.get("/", (req, res) => {
	  res.send("Hello World");
});


// Export the app
module.exports = app;