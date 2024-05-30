import React, { useState, useEffect, useRef } from "react";
import "./usersDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../atoms/navBar/navBar";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [groupRefs, setGroupRefs] = useState({});
    const mainContentRef = useRef(null);

    useEffect(() => {
        if (localStorage.getItem('token'))
            axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/users/");
            const sortedUsers = res.data.sort((a, b) => a.name.localeCompare(b.name));
            setUsers(sortedUsers);
            const refs = {};
            sortedUsers.forEach(user => {
                const firstLetter = user.name[0].toUpperCase();
                if (!refs[firstLetter])
                    refs[firstLetter] = React.createRef();
            });
            setGroupRefs(refs);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users. Please try again later.');
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(`http://localhost:3001/api/users/${userId}`, { role: newRole });
            fetchUsers();
        } catch (error) {
            console.error('Error updating user role:', error);
            setError('Failed to update user role. Please try again later.');
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groupedUsers = filteredUsers.reduce((groups, user) => {
        const firstLetter = user.name[0].toUpperCase();
        if (!groups[firstLetter])
            groups[firstLetter] = [];
        groups[firstLetter].push(user);
        return groups;
    }, {});

    const handleLetterClick = (letter) => {
        if (groupRefs[letter])
            groupRefs[letter].current.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleTopButtonClick = () => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className = "root-container">
            <Navbar />
            <div className = "container">
                <div className = "sidebar">
                    <ul>
                        <li><Link to = "/dashboard">Dashboard</Link></li>
                        <li id = "active"><Link to = "/users_dashboard">Users</Link></li>
                        <li><Link to = "/products_dashboard">Products</Link></li>
                        <li><Link to = "/orders_dashboard">Orders</Link></li>
                        <li id = "black"><Link to = "/">Back to site</Link></li>
                        <li id = "website-name">Love4Games</li>
                    </ul>
                </div>
                <div className = "main-content" ref = {mainContentRef}>
                    <h1>Users Management</h1>
                    <input
                        type = "text"
                        placeholder = "Search users by name or email"
                        value = {searchQuery}
                        onChange = {handleSearchChange}
                        className = "search-bar"
                    />
                    <div className = "letters-list">
                        {Object.keys(groupedUsers).sort().map(letter => (
                            <span key = {letter} onClick = {() => handleLetterClick(letter)}>
                                {letter}
                            </span>
                        ))}
                    </div>
                    <div className = "card-container">
                        {error ? (
                            <div className = "error-message">{error}</div>
                        ) : (
                            Object.keys(groupedUsers).sort().map(letter => (
                                <div key = {letter} className = "group" ref = {groupRefs[letter]}>
                                    <h2>{letter}</h2>
                                    {groupedUsers[letter].map(user => (
                                        <div key = {user._id} className = "card">
                                            <h2>{user.name}</h2>
                                            <p>ID: {user._id}</p>
                                            <p>Email: {user.email}</p>
                                            {console.log(user)}
                                            <select
                                                value = {user.role}
                                                onChange = {(e) => handleRoleChange(user._id, e.target.value)}
                                            >
                                                <option value = "Client">Client</option>
                                                <option value = "Admin">Admin</option>
                                                <option value = "Distributor">Distributor</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <button className = "top-button" onClick = {handleTopButtonClick}>
                ↑
            </button>
        </div>
    );
};

export default Users;
