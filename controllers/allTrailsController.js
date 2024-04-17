// controllers/allTrailsController.js

const axios = require('axios');

// Controller function to search for trails within a radius from a given location
exports.searchTrails = async (req, res) => {
    try {
        const { location, radiusInMiles } = req.body;

        // Convert location to geographic coordinates (latitude and longitude) using a geocoding service
        const coordinates = await geocodeLocation(location);

        // Make API request to AllTrails API
        const trails = await searchTrailsFromAPI(coordinates, radiusInMiles);

        res.json(trails);
    } catch (error) {
        console.error('Error searching for trails:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to geocode location using a geocoding service
async function geocodeLocation(location) {
    // Implement geocoding logic here (using Google Maps Geocoding API or other geocoding service)
    // Return object containing latitude and longitude
}

// Function to search for trails within a radius from a given location using AllTrails API
async function searchTrailsFromAPI(coordinates, radiusInMiles) {
    try {
        const response = await axios.get('https://www.alltrails.com/api/alltrails/areas?limit=10', {
            params: {
                lat: coordinates.latitude,
                lon: coordinates.longitude,
                maxDistance: radiusInMiles * 1609.34 // Convert miles to meters (AllTrails API expects distance in meters)
            }
        });

        // Process API response and return trail data
        const trails = response.data.areas;
        return trails;
    } catch (error) {
        console.error('Error searching for trails from API:', error);
        throw error;
    }
}

const axios = require('axios');

// Controller function to fetch all trails from AllTrails API
exports.getAllTrails = async (req, res) => {
  try {
    const trails = await fetchAllTrailsFromAPI();
    res.json(trails);
  } catch (error) {
    console.error('Error fetching trails:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to fetch all trails from AllTrails API
async function fetchAllTrailsFromAPI() {
  try {
    const apiKey = 'YOUR_ALLTRAILS_API_KEY';
    const apiUrl = 'https://www.alltrails.com/api/alltrails/areas';

    const response = await axios.get(apiUrl, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': 'my-csrf-token' // Add CSRF token if required by the API
      }
    });

    return response.data.areas;
  } catch (error) {
    console.error('Error fetching trails from API:', error);
    throw error;
  }
}








