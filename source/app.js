// Function to handle form submission
document.getElementById('locationForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const location = document.getElementById('locationInput').value;
  
  // Make API request to geocode location
  geocodeLocation(location)
    .then(coordinates => {
      // Display coordinates
      document.getElementById('coordinates').textContent = `Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`;
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('coordinates').textContent = 'Error: Unable to geocode location';
    });
});

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
