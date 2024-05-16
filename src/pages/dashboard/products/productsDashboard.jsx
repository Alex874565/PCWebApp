import React, { useState, useEffect } from "react";
import "./productsDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem("token"))
            }}, 
        []
    )

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            axios.get("http://localhost:3001/api/products/").then((res) => { console.log(res); setProducts(res.data); });
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products. Please try again later.');
        }
    };

    return (
        <div>
            <div className = "container">
                <div className = "sidebar">
                    <ul>
                        <li><Link to = "/dashboard">Dashboard</Link></li>
                        <li><Link to = "/users_dashboard">Users</Link></li>
                        <li id = "active"><Link to = "/products_dashboard">Products</Link></li>
                        <li><Link to = "/orders_dashboard">Orders</Link></li>
                        <li id = "red"><Link to = "/">Back to site</Link></li>
                        <li id="website-name">Love4Games</li>
                    </ul>
                </div>
                <div className = "main-content">
                    <h1>Products management</h1>

                    <div className = "card-container">
                        {error ? (
                            <div className = "error-message">{error}</div>
                        ) : (
                            products.map(product => (
                                <div key = {product._id} className = "card">
                                    <h2>{product.name}</h2>
                                    <p>{product.description}</p>
                                    <p>Launch date: {product.launch_date}</p>
                                    <p>Genre: {product.genre}</p>
                                    <p>Producer: {product.producer}</p>
                                    <p>{product.price}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
