const TrailModel = require("../models/trail");

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

// Search for trails
const searchTrails = async (req, res) => {
    try {
        const { searchField, radius } = req.query;
        const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: searchField,
                radius: radius * 1609.34, // Convert miles to meters
                type: 'park',
                key: API_KEY
            }
        });

        if (response.data.status !== 'OK') {
            return res.status(500).json({ error: 'Failed to fetch trails' });
        }

        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching trails:', error);
        res.status(500).json({ error: 'An error occurred while fetching trails' });
    }
};

module.exports = {
    createTrail,
    getTrail,
    updateTrail,
    deleteTrail,
    searchTrails,
};