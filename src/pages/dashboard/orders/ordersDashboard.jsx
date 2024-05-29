import React, { useState, useEffect } from "react";
import "./ordersDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../atoms/navBar/navBar";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState({});
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [dateSortOrder, setDateSortOrder] = useState("desc");
    const [priceSortOrder, setPriceSortOrder] = useState("desc");

    useEffect(() => {
        if (localStorage.getItem('token'))
            axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem("token"));
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/orders/");
            const sortedOrders = res.data.sort((a, b) => {
                const dateA = new Date(parseDate(a.order_date));
                const dateB = new Date(parseDate(b.order_date));
                return dateB - dateA;
            });
            setOrders(sortedOrders);
            fetchProducts(sortedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to fetch orders. Please try again later.');
        }
    };
    
    const parseDate = (dateString) => {
        const parts = dateString.split('.');
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }; 

    const fetchProducts = async (orders) => {
        try {
            const productIds = [...new Set(orders.flatMap(order => order.products))];
            const res = await axios.get("http://localhost:3001/api/products/", {
                params: { ids: productIds }
            });
            const productsMap = res.data.reduce((acc, product) => {
                acc[product._id] = product.name;
                return acc;
            }, {});
            setProducts(productsMap);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products. Please try again later.');
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortOrderChange = () => {
        const newSortOrder = dateSortOrder === "asc" ? "desc" : "asc";
        console.log("New Sort Date Order:", newSortOrder);
        setDateSortOrder(newSortOrder);
        sortOrdersByDate(newSortOrder);
    };

    const handleSortPriceChange = () => {
        const newSortOrder = priceSortOrder === "asc" ? "desc" : "asc";
        console.log("New Sort Price Order:", newSortOrder);
        setPriceSortOrder(newSortOrder);
        sortOrdersByPrice(newSortOrder);
    };

    const sortOrdersByDate = (order) => {
        const sortedOrders = [...orders].sort((a, b) => {
            const dateA = new Date(a.order_date.split('.').reverse().join('-'));
            const dateB = new Date(b.order_date.split('.').reverse().join('-'));
            if (order === "asc")
                return dateA - dateB;
            else
                return dateB - dateA;
        });
        setOrders(sortedOrders);
    };

    const sortOrdersByPrice = (order) => {
        const sortedOrders = [...orders].sort((a, b) => {
            const priceA = parseFloat(a.value);
            const priceB = parseFloat(b.value);
            if (order === "asc")
                return priceA - priceB;
            else
                return priceB - priceA;
        });
        setOrders(sortedOrders);
    };

    useEffect(() => {
        sortOrdersByDate(dateSortOrder);
    }, [dateSortOrder]);
    
    useEffect(() => {
        sortOrdersByPrice(priceSortOrder);
    }, [priceSortOrder]);

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
                    <h1>Orders Management</h1>
                    <input
                        type = "text"
                        placeholder = "Search orders by user ID"
                        value = {searchQuery}
                        onChange = {handleSearchChange}
                        className = "search-bar"
                    />
                     <div className = "sort-buttons-container">
                        <button onClick = {handleSortOrderChange} className = "sort-button">
                            Sort by Date {dateSortOrder === "asc" ? "Descending" : "Ascending"}
                        </button>
                        <button onClick = {handleSortPriceChange} className = "sort-button">
                            Sort by Price {priceSortOrder === "asc" ? "Descending" : "Ascending"}
                        </button>
                    </div>
                    <div className = "card-container">
                        {error ? (
                            <div className = "error-message">{error}</div>
                        ) : (
                            filteredOrders.map(order => (
                                <div key = {order._id} className = "card">
                                    <h2>User ID: {order.user_id}</h2>
                                    <p>Value: {order.value}</p>
                                    <p>Date: {order.order_date}</p>
                                    <ul>
                                        {order.products.map(productId => (
                                            <li key = {productId}>
                                                {products[productId] || "Loading..."}
                                            </li>
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
