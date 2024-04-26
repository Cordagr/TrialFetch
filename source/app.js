// Function to handle form submission
document.getElementById('locationForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const location = document.getElementById('locationInput').value;
  
  // Geocode location
  geocodeLocation(location)
    .then(coordinates => {
      // Find trails using AllTrails API
      findTrails(coordinates);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('trails').textContent = 'Error: Unable to geocode location';
    });
});

// Function to geocode location using Google Maps Geocoding API
async function geocodeLocation(location) {
  try {
    const apiKey = 'YOUR_GOOGLE_API_KEY';
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

// Function to find trails using AllTrails API
async function findTrails(coordinates) {
  try {
    const apiKey = 'YOUR_ALLTRAILS_API_KEY';
    const radiusInMiles = 10; // Example radius (adjust as needed)
    const apiUrl = `https://www.alltrails.com/api/alltrails/areas?limit=10&lat=${coordinates.latitude}&lon=${coordinates.longitude}&maxDistance=${radiusInMiles * 1609.34}`;

    const response = await axios.get(apiUrl);

    // Display trail information
    const trails = response.data.areas;
    const trailsHtml = trails.map(trail => `<p>${trail.name}</p>`).join('');
    document.getElementById('trails').innerHTML = trailsHtml;
  } catch (error) {
    console.error('Error finding trails:', error);
    document.getElementById('trails').textContent = 'Error: Unable to find trails';
  }
}

// Event listener for fetching all trails
document.getElementById('fetchAllTrails').addEventListener('click', function() {
  fetchAllTrails();
});

document.getElementById('saveTrailForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const location = document.getElementById('location').value;
  const length = document.getElementById('length').value;

  try {
    // Make a POST request to save the trail
    const response = await axios.post('/api/trails/save', { name, location, length });
    console.log(response.data.message);

    // Optionally, display a success message or redirect to another page
  } catch (error) {
    console.error('Error saving trail:', error);
    // Display error message to the user
  }
});







// Function to fetch all trails from AllTrails API
async function fetchAllTrails() {
  try {
    const apiKey = 'YOUR_ALLTRAILS_API_KEY';
    const apiUrl = 'https://www.alltrails.com/api/alltrails/areas';

    const response = await axios.get(apiUrl, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': 'my-csrf-token' // Add CSRF token if required by the API
      }
    });

    // Display trail information
    const trails = response.data.areas;
    const trailsHtml = trails.map(trail => `<p>${trail.name}</p>`).join('');
    document.getElementById('trails').innerHTML = trailsHtml;
  } catch (error) {
    console.error('Error fetching trails:', error);
    document.getElementById('trails').textContent = 'Error: Unable to fetch trails';
  }
}
