import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import axios from '../../../api';

const FavoriteTrails = () => {
  const { user } = useContext(UserContext);
  const [favoriteTrails, setFavoriteTrails] = useState([]);

  useEffect(() => {
    const fetchFavoriteTrails = async () => {
      try {
        const response = await axios.get(`/api/users/favorites/${user._id}`);
        setFavoriteTrails(response.data.favoriteTrails);
      } catch (error) {
        console.error('Error fetching favorite trails:', error);
      }
    };

    if (user) {
      fetchFavoriteTrails();
    }
  }, [user]);

  const removeFavoriteTrail = async (googlePlaceId) => {
    try {
      await axios.delete('/api/users/favorite', { data: { userId: user._id, googlePlaceId } });
      setFavoriteTrails((prevFavorites) => prevFavorites.filter((id) => id !== googlePlaceId));
    } catch (error) {
      console.error('Error removing favorite trail:', error);
    }
  };

  return (
    <div>
      <h2>Favorite Trails</h2>
      {favoriteTrails.length > 0 ? (
        <ul>
          {favoriteTrails.map((trailId) => (
            <li key={trailId}>
              {/* Render trail details here */}
              <button onClick={() => removeFavoriteTrail(trailId)}>Remove from Favorites</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite trails yet.</p>
      )}
    </div>
  );
};

export default FavoriteTrails;
