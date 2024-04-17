const axios = require('axios');

// Function to geocode location using Google Maps Geocoding API
async function geocodeLocation(location) {
    try {
        const apiKey = 'YOUR_API_KEY';
        const encodedLocation = encodeURIComponent(location);
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${apiKey}`;

        const response = await axios.get(apiUrl);

        // Extract latitude and longitude from API response
        const { lat, lng } = response.data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
    } catch (error) {
        console.error('Error geocoding location:', error);
        throw error;
    }
}
