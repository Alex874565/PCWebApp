import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../searchBar/searchBar';
import '../../atoms/searchBar/searchBar.css';
import './navBar.css';
import axios from 'axios';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [user, setUser] = useState(null);

    const handleClickInsideDropdown = (e) => {
        e.stopPropagation();
    };

    const handleClickOutsideDropdown = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    const handleIconClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const logOut = () => {
        if(window.confirm("Are you sure you want to log out?")){
            localStorage.clear()
            axios.defaults.headers.common['Authorization'] = ""
            window.alert("Logged out successfully!")
            window.location.replace("/")
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideDropdown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown);
        };
    }, []);

    useEffect(() => {
        if(localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem("user")))
        }
    }, [])

    return (
        <nav className="navbar">
            <div className="navbar-logo"><Link style ={{color:"rgba(255, 255, 255, 0.87)",textDecoration: "none"}} to = "/">Love4Games</Link></div>
            <SearchBar/>
            <ul className="navbar-links">
                <li><Link to = "/about">About</Link></li>
                <li><Link to = "/products/">Products</Link></li>
                <li><Link to = "/contact">Contact</Link></li>
                <li className = "navbar-dropdown" ref = {dropdownRef}>
                    <div className = "profile-icon" onClick = {handleIconClick} style = {{ cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faUser} />
                        {
                            isDropdownOpen && !user &&
                                <ul className = "dropdown-menu" onClick = {handleClickInsideDropdown}>
                                    <li><Link to = "/login">Log In</Link></li>
                                    <li><Link to = "/register">Register</Link></li>
                                </ul>
                        }
                        {  
                            isDropdownOpen && user && 
                                <ul className = "dropdown-menu" onClick = {handleClickInsideDropdown}>
                                    <li><Link to = "/cart">Cart</Link></li>
                                    <li><a onClick={logOut}>Disconnect</a></li>
                                </ul>
                        }
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
