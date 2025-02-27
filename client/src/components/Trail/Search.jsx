import React from 'react';

const Search = ({ searchTrails, handleSearch, searchField, handleRadius, radius }) => {
    return (
        <div className="search-container">
            <form onSubmit={searchTrails}>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input 
                        type="text" 
                        id="location"
                        value={searchField} 
                        onChange={handleSearch} 
                        placeholder="Enter location (e.g., city, zip code)" 
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="radius">Radius (miles)</label>
                    <input 
                        type="number" 
                        id="radius"
                        value={radius} 
                        onChange={handleRadius} 
                        min="1" 
                        max="50" 
                        required
                    />
                </div>
                <button type="submit" className="search-btn">Search Trails</button>
            </form>
        </div>
    );
};

export default Search;
