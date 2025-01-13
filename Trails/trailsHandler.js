// Get the user's current location
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}

// Fetch nearby trails using the Hiking Project API
async function fetchNearbyTrails(latitude, longitude) {
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
  const url = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=10&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.trails;
  } catch (error) {
    console.error('Error fetching trails:', error);
    return [];
  }
}

async function getNearbyTrails() {
  try {
    const position = await getCurrentLocation();
    const { latitude, longitude } = position.coords;
    const trails = await fetchNearbyTrails(latitude, longitude);
    console.log('Nearby trails:', trails);
    // You can now display the trails on the UI
  } catch (error) {
    console.error('Error getting nearby trails:', error);
  }
}

// Call the function to get and display nearby trails
getNearbyTrails();




