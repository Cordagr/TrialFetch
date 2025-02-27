const axios = require('axios');

// Proxy for Google Places API to avoid CORS issues
const searchPlaces = async (req, res) => {
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
        } else if (location) {
            // Nearby search
            url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
            params.location = location;
            params.radius = radius || 5000;
        } else {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        if (type) {
            params.type = type;
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
    searchPlaces
};
