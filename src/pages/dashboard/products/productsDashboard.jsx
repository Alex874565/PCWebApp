import React, { useState, useEffect } from "react";
import "./productsDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../atoms/navBar/navBar";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem("token"));
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/products/");
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products. Please try again later.');
        }
    };

    const handleEditClick = (product) => {
        setEditing(product._id);
        setFormData(product);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSaveClick = async (productId) => {
        try {
            await axios.put(`http://localhost:3001/api/products/${productId}`, formData);
            fetchProducts(); // Refresh the product list
            setEditing(null); // Exit edit mode
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Failed to update product. Please try again later.');
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="sidebar">
                    <ul>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/users_dashboard">Users</Link></li>
                        <li id="active"><Link to="/products_dashboard">Products</Link></li>
                        <li><Link to="/orders_dashboard">Orders</Link></li>
                        <li id="red"><Link to="/">Back to site</Link></li>
                        <li id="website-name">Love4Games</li>
                    </ul>
                </div>
                <div className="main-content">
                    <h1>Products management</h1>

                    <div className="card-container">
                        {error ? (
                            <div className="error-message">{error}</div>
                        ) : (
                            products.map(product => (
                                <div key={product._id} className="card">
                                    {editing === product._id ? (
                                        <div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="launch_date"
                                                value={formData.launch_date}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="genre"
                                                value={formData.genre}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="producer"
                                                value={formData.producer}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="number"
                                                name="stock"
                                                value={formData.stock}
                                                onChange={handleInputChange}
                                            />
                                            <button onClick={() => handleSaveClick(product._id)}>Save</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <h2>{product.name}</h2>
                                            <p>{product.description}</p>
                                            <p>Launch date: {product.launch_date}</p>
                                            <p>Genre: {product.genre}</p>
                                            <p>Producer: {product.producer}</p>
                                            <p>Price: {product.price}</p>
                                            <p>Stock: {product.stock}</p>
                                            <button onClick={() => handleEditClick(product)}>Edit</button>
                                        </div>
                                    )}
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
