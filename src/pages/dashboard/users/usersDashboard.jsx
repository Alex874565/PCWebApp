import React, { useState, useEffect } from "react";
import "./usersDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../atoms/navBar/navBar";
import Footer from "../../../atoms/footer/footer";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem("token"))
            }}, 
        []
    )

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/users/");
            setUsers(res.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users. Please try again later.');
        }
    };

    const handleEditClick = (userId) => {
        window.location.assign(`/edit_user/${userId}`);
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

    return (
        <div>
            <Navbar/>
            <div className = "container">
                <div className = "sidebar">
                    <ul>
                        <li><Link to = "/dashboard">Dashboard</Link></li>
                        <li id = "active"><Link to = "/users_dashboard">Users</Link></li>
                        <li><Link to = "/products_dashboard">Products</Link></li>
                        <li><Link to = "/orders_dashboard">Orders</Link></li>
                        <li id = "red"><Link to = "/">Back to site</Link></li>
                        <li id = "website-name">Love4Games</li>
                    </ul>
                </div>
                <div className = "main-content">
                    <h1>Users management</h1>
                    <div className = "card-container">
                        {error ? (
                            <div className = "error-message">{error}</div>
                        ) : (
                            users.map(user => (
                                <div key = {user._id} className="card">
                                    <h2>{user.name}</h2>
                                    <p>{user.email}</p>
                                    <select
                                        value = {user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    >
                                        <option value = "Client">Client</option>
                                        <option value = "Admin">Admin</option>
                                        <option value = "Distributor">Distributor</option>
                                    </select>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Users;
