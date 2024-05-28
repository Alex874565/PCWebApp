import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../searchBar/searchBar';
import '../../atoms/searchBar/searchBar.css';
import './navBar.css';
import $ from 'jquery';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [user, setUser] = useState(null);
    const location = useLocation();

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

    useEffect(() => {
        $('.navbar-links a').each(function () {
            if(window.location.href === this.href){
                this.classList.add('active')
            }
        })
    })

    return (
        <nav className="navbar">
            <div className="navbar-logo"><Link style ={{color:"rgba(255, 255, 255, 0.87)",textDecoration: "none"}} to = "/">Love4Games</Link></div>
            <SearchBar/>
            <div className="navbar-links">
                <Link to = "/about">About</Link>
                <Link to = "/products/">Products</Link>
                <Link to = "/contact">Contact</Link>
                {
                    user && ["Admin", "Distributor"].indexOf(user.role) != -1 &&
                    <Link to = "/dashboard">Dashboard</Link>
                }
                <div className = "navbar-dropdown" ref = {dropdownRef}>
                    <div className = "profile-icon" onClick = {handleIconClick} style = {{ cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faUser} />
                        {
                            isDropdownOpen && !user &&
                                <div className = "dropdown-menu" onClick = {handleClickInsideDropdown}>
                                    <Link to = "/login">Log In</Link>
                                    <Link to = "/register">Register</Link>
                                </div>
                        }
                        {  
                            isDropdownOpen && user && 
                                <div className = "dropdown-menu" onClick = {handleClickInsideDropdown}>
                                    <Link to = "/cart">Cart</Link>
                                    <a onClick={logOut}>Disconnect</a>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
