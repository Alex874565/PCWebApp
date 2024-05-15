import React from "react";
import "./usersDashboard.css";
import { Link } from "react-router-dom";

const UsersDashboard = () => {
    return (
        <div>
            <div className = "container">
                <div className = "sidebar">
                    <ul>
                        <li><Link to = "/dashboard">Dashboard</Link></li>
                        <li id = "active"><Link to="/users">Users</Link></li>
                        <li><Link to = "/products">Products</Link></li>
                        <li><Link to = "/orders">Orders</Link></li>
                        <li id = "red"><Link to = "/">Back to site</Link></li>
                    </ul>
                </div>
                <div className = "main-content">
                    <h1>Users management</h1>

                    <div className = "card-container">
                        <div className = "card">
                            <h2>User 1</h2>
                            <p>User details...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersDashboard;
