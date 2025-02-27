import React from 'react';
import PropTypes from 'prop-types';

// Search component
// This displays the search bar on the top of the page
// and handles submitting the form with user input
// to the searchTrails function.
const Search = ({ searchTrails, handleSearch, searchField, handleRadius, radius }) => {
    return (
        <div className="search-area">
            <form onSubmit={searchTrails}>
                <img src='/icons/search-line.svg' alt='search icon' className='search-icon'/>
                <input 
                    onChange={handleSearch} 
                    type="text"
                    value={searchField}
                    placeholder="Search for trails..."
                />
                <input 
                    onChange={handleRadius} 
                    type="number"
                    value={radius}
                    placeholder="Radius in miles"
                />
                {/* <button type="submit">Search</button> */}
            </form>
        </div>
    );
};

// Define prop types for the Search component
Search.propTypes = {
    searchField: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    searchTrails: PropTypes.func.isRequired,
    handleRadius: PropTypes.func.isRequired,
    radius: PropTypes.number.isRequired,
};

export default Search;
