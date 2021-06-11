import React from 'react';

import '../stylesheets/MusicPlayer.css';

const SearchBar = ({ searchTerm, onChange, onSearch }) => (
    <div className="search">
        <label htmlFor="search-bar">Search music:</label>
        <input
            type="text"
            id="search-bar"
            name="search-bar"
            className="control-input"
            value={searchTerm}
            onChange={({ target: { value } }) => onChange}
        />
        <button type="button" className="search-btn" onClick={() => onSearch}>
            Search
        </button>
    </div>
);


export {
    SearchBar
};
