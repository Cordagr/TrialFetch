import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../../api';
import Search from './Search.jsx';
import TrailList from './TrailList';

const Trails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [trails, setTrails] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [radius, setRadius] = useState(10);
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);

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

        // Reset limit and offset for a new search
        setOffset(0);
        setLimit(10);
        setTrails([]);

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${encodeURIComponent(searchField)}&radius=${encodeURIComponent(radius * 1609.34)}&type=park&key=${encodeURIComponent(API_KEY)}`
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setTrails(data.results || []);
            setOffset(prevOffset => prevOffset + limit);

            // If offset is 0, navigate to search page with state
            if (offset === 0) {
                navigate('/search', { state: { trails: data.results || [], searchField, radius } });
            }
        } catch (error) {
            console.error('Error searching trails:', error);
            // You could add error handling UI here
        }
    };

    const handleSearch = (e) => {
        setSearchField(e.target.value);

        // Reset limit and offset for a new search
        setOffset(0);
        setLimit(10);
        setTrails([]);
    };

    const handleRadius = (e) => {
        setRadius(e.target.value);
    };

    const addToFavorites = async (googlePlaceId) => {
        try {
            await axios.post('/api/users/add-favorite', {
                userId: 'USER_ID', // Replace with actual user ID
                googlePlaceId
            });
            alert('Trail added to favorites');
        } catch (error) {
            console.error('Failed to add favorite trail', error);
        }
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
            {trails.length > 0 ? (
                <TrailList trails={trails} addToFavorites={addToFavorites} />
            ) : (
                <p>No trails found. Try searching for a location.</p>
            )}
        </div>
    );
};

export default Trails;
