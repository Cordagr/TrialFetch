// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/trails', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Body parser middleware
app.use(bodyParser.json());

// Define trail schema
const trailSchema = new mongoose.Schema({
  name: String,
  location: String,
  length: Number,
  // Add other fields as needed
});

const Trail = mongoose.model('Trail', trailSchema);

// Save trail endpoint
app.post('/api/trails/save', async (req, res) => {
  try {
    const { name, location, length } = req.body;

    // Create a new trail object
    const newTrail = new Trail({
      name,
      location,
      length
      // Add other fields as needed
    });

    // Save the trail to the database
    await newTrail.save();

    res.status(201).json({ message: 'Trail saved successfully' });
  } catch (error) {
    console.error('Error saving trail:', error);
    res.status(500).json({ error: 'Failed to save trail' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
