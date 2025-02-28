import React, { useContext } from 'react';
import axios from '../../../../api/api';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';

const TrailCard = ({ trail }) => {
    const { user } = useContext(UserContext);
    
    const addToFavorites = async () => {
        if (!user) {
            toast.error('Please login to add favorites');
            return;
        }
        
        try {
            await axios.post('/api/users/add-favorite', { 
                userId: user._id, 
                googlePlaceId: trail.place_id 
            });
            toast.success('Added to favorites!');
        } catch (error) {
            console.error('Error adding to favorites:', error);
            toast.error('Failed to add to favorites');
        }
    };
    
    return (
        <div className="trail-card">
            <h3>{trail.name}</h3>
            <p>{trail.vicinity}</p>
            <div className="trail-rating">
                Rating: {trail.rating} ({trail.user_ratings_total} reviews)
            </div>
            {trail.photos && trail.photos.length > 0 && (
                <img 
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${trail.photos[0].photo_reference}&key=${import.meta.env.VITE_API_KEY}`} 
                    alt={trail.name} 
                    className="trail-image"
                />
            )}
            <button onClick={addToFavorites} className="favorite-btn">
                Add to Favorites
            </button>
        </div>
    );
};

export default TrailCard;
