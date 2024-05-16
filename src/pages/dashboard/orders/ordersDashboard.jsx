import React, { useState, useEffect } from "react";
import "./ordersDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem("token"))
            }}, 
        []
    )

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            axios.get("http://localhost:3001/api/orders/").then((res) => { console.log(res); setOrders(res.data); });
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to fetch orders. Please try again later.');
        }
    };

    return (
        <div>
            <div className = "container">
                <div className = "sidebar">
                    <ul>
                        <li><Link to = "/dashboard">Dashboard</Link></li>
                        <li><Link to = "/users_dashboard">Users</Link></li>
                        <li><Link to = "/products_dashboard">Products</Link></li>
                        <li id = "active"><Link to = "/orders_dashboard">Orders</Link></li>
                        <li id = "red"><Link to = "/">Back to site</Link></li>
                        <li id="website-name">Love4Games</li>
                    </ul>
                </div>
                <div className = "main-content">
                    <h1>Orders management</h1>

                    <div className = "card-container">
                        {error ? (
                            <div className = "error-message">{error}</div>
                        ) : (
                            orders.map(user => (
                                <div key = {order._id} className = "card">
                                    <h2>{order.name}</h2>
                                    <p>{order.details}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
