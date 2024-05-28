import React, { useState, useEffect } from "react";
import "./ordersDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../atoms/navBar/navBar";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (localStorage.getItem('token'))
            axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/orders/");
            const sortedOrders = res.data.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
            setOrders(sortedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to fetch orders. Please try again later.');
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredOrders = orders.filter(order =>
        order.user_id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <div className = "container">
                <div className = "sidebar">
                    <ul>
                        <li><Link to = "/dashboard">Dashboard</Link></li>
                        <li><Link to = "/users_dashboard">Users</Link></li>
                        <li><Link to = "/products_dashboard">Products</Link></li>
                        <li id = "active"><Link to = "/orders_dashboard">Orders</Link></li>
                        <li id = "red"><Link to = "/">Back to site</Link></li>
                        <li id = "website-name">Love4Games</li>
                    </ul>
                </div>
                <div className = "main-content">
                    <h1>Orders management</h1>
                    <input
                        type = "text"
                        placeholder = "Search orders by user ID"
                        value = {searchQuery}
                        onChange = {handleSearchChange}
                        className = "search-bar"
                    />
                    <div className = "card-container">
                        {error ? (
                            <div className = "error-message">{error}</div>
                        ) : (
                            filteredOrders.map(order => (
                                <div key = {order._id} className = "card">
                                    <h2>User ID: {order.user_id}</h2>
                                    <p>Value: {order.value}</p>
                                    <p>Date: {order.order_date}</p>
                                    <p>Products:</p>
                                    <ul>
                                        {order.products.map((product, index) => (
                                            <li key = {index}>{product}</li>
                                        ))}
                                    </ul>
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
