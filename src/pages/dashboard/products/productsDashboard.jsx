import React from "react";
import "./productsDashboard.css";
import { Link } from "react-router-dom";

const ProductsDashboard = () => {
    return (
        <div>
            <div className = "container">
                <div className = "sidebar">
                    <ul>
                        <li><Link to = "/dashboard">Dashboard</Link></li>
                        <li><Link to = "/users">Users</Link></li>
                        <li id = "active"><Link to = "/products">Products</Link></li>
                        <li><Link to = "/orders">Orders</Link></li>
                        <li id = "red"><Link to = "/">Back to site</Link></li>
                    </ul>
                </div>
                <div className = "main-content">
                    <h1>Products management</h1>

                    <div className="card-container">
                        <div className="card">
                            <h2>Product 1</h2>
                            <p>Product details...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsDashboard;
