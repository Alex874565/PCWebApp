import React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <div className = "container">
                <div className = "sidebar">
                    <ul>
                        <li id = "active"><Link to = "/dashboard">Dashboard</Link></li>
                        <li><Link to = "/users">Users</Link></li>
                        <li><Link to = "/products">Products</Link></li>
                        <li><Link to = "/orders">Orders</Link></li>
                        <li id = "red"><Link to = "/">Back to site</Link></li>
                    </ul>
                </div>
                <div className = "main-content">
                    <h1>Admin dashboard</h1>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
