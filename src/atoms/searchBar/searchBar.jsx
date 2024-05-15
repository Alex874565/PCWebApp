import React from 'react';
import { useState } from 'react';

const SearchBar = () => {
  const [ keyword, setKeyword ] = useState("");
  return (
    <div className="search-bar">
      <input onKeyUp={(e) => {if(e.keyCode == 13){window.location.href = `/products/${keyword}`;}}} onChange={(e) => {setKeyword(e.target.value)}} type="text" placeholder="Search games" />
      <button onClick={() => (window.location.href = `/products/${keyword}`)}>Search</button>
    </div>
  );
}

export default SearchBar;
