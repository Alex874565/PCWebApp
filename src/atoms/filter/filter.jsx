import React, { useState } from 'react';
import './filter.css'; // Import CSS for styling

function FilterPanel({ isOpen, onClose }) {
    return (
      <div className={`sidepanel ${isOpen ? 'open' : 'closed'}`}>
        <button className="closeBtn" onClick={onClose}>Close</button>
        <div className="filterGroup">
          <label htmlFor="producer">Producer:</label>
          <input type="text" id="producer" name="producer" />
        </div>
        <div className="filterGroup">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" />
        </div>
        <div className="filterGroup">
          <label htmlFor="genre">Genre:</label>
          <select id="genre" name="genre">
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="filterGroup">
          <label htmlFor="releaseDate">Release Date:</label>
          <input type="date" id="releaseDate" name="releaseDate" />
        </div>
      </div>
    );
  }

export default FilterPanel;
