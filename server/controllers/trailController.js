const TrailModel = require("../models/trail");
const axios = require("axios");

// Create a new trail
const createTrail = async (req, res) => {
    try {
        const newTrail = new TrailModel(req.body);
        await newTrail.save();
        res.status(201).json(newTrail);
    } catch (error) {
        res.status(500).json({ error: "Failed to create trail" });
    }
};

// Get a trail by ID
const getTrail = async (req, res) => {
    try {
        const { trailId } = req.body;
        const trail = await TrailModel.findById(trailId);
        if (!trail) {
            return res.status(404).json({ message: "Trail not found" });
        }
        res.status(200).json(trail);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch trail" });
    }
};

// Update a trail by ID
const updateTrail = async (req, res) => {
    try {
        const { trailId } = req.body;
        const updatedTrail = await TrailModel.findByIdAndUpdate(trailId, req.body, { new: true });
        if (!updatedTrail) {
            return res.status(404).json({ message: "Trail not found" });
        }
        res.status(200).json(updatedTrail);
    } catch (error) {
        res.status(500).json({ error: "Failed to update trail" });
    }
};

// Delete a trail by ID
const deleteTrail = async (req, res) => {
    try {
        const { trailId } = req.body;
        const deletedTrail = await TrailModel.findByIdAndDelete(trailId);
        if (!deletedTrail) {
            return res.status(404).json({ message: "Trail not found" });
        }
        res.status(200).json({ message: "Trail deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete trail" });
    }
};

// Proxy for Google Places API to avoid CORS issues
const searchPlacesProxy = async (req, res) => {
    try {
        console.log("Places proxy request received:", req.query);
        const { query, location, radius, type } = req.query;
        const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

        if (!API_KEY) {
            return res.status(500).json({ error: 'Google Places API key is missing' });
        }

        let url;
        let params = { key: API_KEY };

        if (query) {
            // Text search
            url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
            params.query = query;
        } else {
            // Nearby search
            url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
            params.location = location || '37.7749,-122.4194'; // Default to San Francisco
            params.radius = radius ? radius * 1609.34 : 5000; // Convert miles to meters or default to 5km
            params.type = type || 'park';
        }

        console.log("Making request to Google Places API:", url, params);
        const response = await axios.get(url, { params });
        
        console.log("Google Places API response status:", response.data.status);
        res.json(response.data);
    } catch (error) {
        console.error('Error in places proxy:', error);
        res.status(500).json({ error: 'An error occurred while fetching places' });
    }
};

module.exports = {
    createTrail,
    getTrail,
    updateTrail,
    deleteTrail,
    searchPlacesProxy
};
