import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Search'; 

const Trails = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [trails, setTrails] = useState([]); // State for trails
    const [searchField, setSearchField] = useState(''); // State for search input
    const [radius, setRadius] = useState(10); // State for radius
    const API_KEY = import.meta.env.VITE_API_KEY; // API key

    const [offset, setOffset] = useState(0); // State for offset
    const [limit, setLimit] = useState(10); // State for limit

    // Function to search for trails
    const searchTrails = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Reset limit and offset for a new search
        setOffset(0); // Reset offset to initial value
        setLimit(10); // Reset limit to initial value
        setTrails([]); // Clear previous trails

        // Fetch data from Google Places API (replace `PLACES_API_URL` with the actual API endpoint)
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${encodeURIComponent(searchField)}&radius=${encodeURIComponent(radius * 1609.34)}&type=park&key=${encodeURIComponent(API_KEY)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const newTrails = data.results || []; // Default to empty array if no results
                setTrails(prevTrails => [...prevTrails, ...newTrails]); // Update trails state
                setOffset(prevOffset => prevOffset + limit); // Increment offset by 10

                // If offset is 0, navigate to search page with state
                if (offset === 0) {
                    navigate('/search-page', { state: { trails: [...trails, ...newTrails], searchField, radius } }); 
                } 
                // Reload the page upon submitting a new search results
                window.location.reload(); // Reload the page 
            })
            .catch(error => console.error('Error: ', error)); // Catch any errors
    };

    // Function to handle the search field
    const handleSearch = (e) => {
        setSearchField(e.target.value);

        // Reset limit and offset for a new search
        setOffset(0); // Reset offset to initial value
        setLimit(10); // Reset limit to initial value
        setTrails([]); // Clear previous trails
    };

    // Function to handle the radius input
    const handleRadius = (e) => {
        setRadius(e.target.value);
    };


    const addFavorite = async (googlePlaceId) => {
        try {
            const userId = 'USER_ID'; // Replace with actual user ID
            await axios.post('/api/favorites', { userId, googlePlaceId });
            alert('Trail added to favorites');
        } catch (error) {
            console.error('Failed to add favorite trail', error);
        }
    };

    return (
        <div>
            <form onSubmit={searchTrails}>
                <input type="text" value={searchField} onChange={(e) => setSearchField(e.target.value)} placeholder="Search for trails" />
                <input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} placeholder="Radius in miles" />
                <button type="submit">Search</button>
            </form>
            <ul>
                {trails.map(trail => (
                    <li key={trail.place_id}>
                        {trail.name}
                        <button onClick={() => addFavorite(trail.place_id)}>Add to Favorites</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


    return (
        <div>
            <Search 
                searchTrails={searchTrails} 
                handleSearch={handleSearch} 
                searchField={searchField} 
                handleRadius={handleRadius} 
                radius={radius}
            />
        </div>
    );

export default Trails;
