import React from 'react';
import SearchBar from "../../atoms/searchBar/searchBar";
import "../../atoms/searchBar/searchBar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Love4Games</div>
      <SearchBar/>
      <ul className="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;