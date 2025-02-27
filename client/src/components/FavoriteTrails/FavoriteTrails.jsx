import React from 'react';

const FavoriteTrails = ({ trails }) => {
	return (
		<>
			<div className="trail-card">
				<div className="trail-title">Your Favorite Trails</div>
				<div className="inner-card-container">
					{trails.map((trail, index) => (
						<div className="inner-trail-container" key={index}>
							<div className="inner-card"></div>
							<div className="inner-title">{trail.name}</div>
							<div className="inner-location">{trail.location}</div>
						</div>
					))}
				</div>
				<img src="./icons/right.svg" alt="Right Arrow" className="rightarrow" />
			</div>
		</>
	);
}

export default FavoriteTrails;
