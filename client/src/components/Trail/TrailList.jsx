import React from 'react';
import TrailCard from './TrailCard';

const TrailList = ({ trails }) => {
    return (
        <div className="trail-list">
            {trails.map(trail => (
                <TrailCard key={trail.place_id} trail={trail} />
            ))}
        </div>
    );
};

export default TrailList;
