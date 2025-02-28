import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Search from '../components/Trail/Search';
import TrailList from '../components/Trail/TrailList';
import axios from '../../../api/api';

const SearchPage = () => {
    const location = useLocation();
    console.log("SearchPage rendered");
    const [trails, setTrails] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [radius, setRadius] = useState(10);
    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        // If trails were passed via navigation state, use them
        if (location.state?.trails) {
            setTrails(location.state.trails);
            setSearchField(location.state.searchField || '');
            setRadius(location.state.radius || 10);
        }
    }, [location.state]);

    const searchTrails = async (e) => {
        e.preventDefault();
        console.log("Searching for trails near:", searchField, "with radius:", radius);
        
        try {
            // Use our server-side proxy for Google Places API
            const response = await axios.get(`/api/trails/searchPlaces?query=${encodeURIComponent(searchField + ' hiking trails')}&radius=${encodeURIComponent(radius)}`);
            
            if (!response.data.status || response.data.status !== 'OK') {
                console.error("API response not OK:", response.data.status);
                throw new Error(`Google Places API response not OK: ${response.data.status}`);
            }
            
            setTrails(response.data.results || []);
        } catch (error) {
            console.error('Error searching trails:', error);
            alert("Error searching for trails. Please try again.");
        }
    };

    const handleSearch = (e) => {
        setSearchField(e.target.value);
    };

    const handleRadius = (e) => {
        setRadius(e.target.value);
    };

    return (
        <div className="search-page">
            <h1>Find Trails Near You</h1>
            <Search 
                searchTrails={searchTrails}
                handleSearch={handleSearch}
                searchField={searchField}
                handleRadius={handleRadius}
                radius={radius}
            />
            {trails.length > 0 ? (
                <TrailList trails={trails} />
            ) : (
                <p>No trails found. Try searching for a location.</p>
            )}
        </div>
    );
};

export default SearchPage;
