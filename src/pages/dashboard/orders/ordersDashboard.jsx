import React from "react";
import "./ordersDashboard.css";
import { Link } from "react-router-dom";

const OrdersDashboard = () => {
    return (
        <div>
            <div className = "container">
                <div className = "sidebar">
                    <ul>
                        <li><Link to = "/dashboard">Dashboard</Link></li>
                        <li><Link to = "/users">Users</Link></li>
                        <li><Link to = "/products">Products</Link></li>
                        <li id = "active"><Link to = "/orders">Orders</Link></li>
                        <li id = "red"><Link to = "/">Back to site</Link></li>
                    </ul>
                </div>
                <div className = "main-content">
                    <h1>Orders management</h1>

                    <div className="card-container">
                        <div className="card">
                            <h2>Order 1</h2>
                            <p>Order details...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersDashboard;
