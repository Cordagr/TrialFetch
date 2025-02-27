import React from 'react';
import TrailCard from './TrailCard';

// Returns a list of trails from the user's search, calls TrailCard.
const TrailList = (props) => {
    return (
        <div className="list"> 
            {
                props.trails.map((trail, index) => {
                    return <TrailCard 
                                key={index}
                                id={trail.id}
                                image={trail.image} // Assuming trail object has an image property
                                name={trail.name}
                                location={trail.location}
                                distance={trail.distance}
                                averageRating={trail.averageRating}
                                reviews={trail.reviews}
                             />
                })
            }
        </div>
    )
}

export default TrailList;
