import React, { useState, useEffect } from "react";
import "./productsDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../atoms/navBar/navBar";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [groupRefs, setGroupRefs] = useState({});

    useEffect(() => {
        if (localStorage.getItem('token'))
            axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/products/");
            const sortedProducts = res.data.sort((a, b) => a.name.localeCompare(b.name));
            setProducts(sortedProducts);
            const refs = {};
            sortedProducts.forEach(product => {
                const firstLetter = product.name[0].toUpperCase();
                if (!refs[firstLetter])
                    refs[firstLetter] = React.createRef();
            });
            setGroupRefs(refs);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products. Please try again later.');
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groupedProducts = filteredProducts.reduce((groups, product) => {
        const firstLetter = product.name[0].toUpperCase();
        if (!groups[firstLetter])
            groups[firstLetter] = [];
        groups[firstLetter].push(product);
        return groups;
    }, {});

    const handleLetterClick = (letter) => {
        if (groupRefs[letter])
            groupRefs[letter].current.scrollIntoView({ behavior: "smooth" });
    };

    const handleTopButtonClick = () => {
        const container = document.querySelector('.main-content');
        if (container)
            container.scrollTo({ top: 0, behavior: "smooth" });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div>
            <Navbar />
            <div className = "container">
                <div className = "sidebar">
                    <ul>
                        <li><Link to = "/dashboard">Dashboard</Link></li>
                        <li><Link to = "/users_dashboard">Users</Link></li>
                        <li id = "active"><Link to = "/products_dashboard">Products</Link></li>
                        <li><Link to = "/orders_dashboard">Orders</Link></li>
                        <li id = "red"><Link to = "/">Back to site</Link></li>
                        <li id = "website-name">Love4Games</li>
                    </ul>
                </div>
                <div className = "main-content">
                    <h1>Products Management</h1>
                    <input
                        type = "text"
                        placeholder = "Search products by name"
                        value = {searchQuery}
                        onChange = {handleSearchChange}
                        className = "search-bar"
                    />
                    <div className = "letters-list">
                        {Object.keys(groupedProducts).sort().map(letter => (
                            <span key = {letter} onClick = {() => handleLetterClick(letter)}>
                                {letter}
                            </span>
                        ))}
                    </div>
                    <div className = "card-container">
                        {error ? (
                            <div className = "error-message">{error}</div>
                        ) : (
                            Object.keys(groupedProducts).sort().map(letter => (
                                <div key = {letter} className = "group" ref = {groupRefs[letter]}>
                                    <h2>{letter}</h2>
                                    {groupedProducts[letter].map(product => (
                                        <div key = {product._id} className = "card">
                                            <h2>{product.name}</h2>
                                            <p>Description: {product.description}</p>
                                            <p>Launch Date: {product.launch_date}</p>
                                            <p>Genre: {product.genre}</p>
                                            <p>Producer: {product.producer}</p>
                                            <p>Price: {product.price}</p>
                                            <p>Stock: {product.stock}</p>
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

export default Products;
