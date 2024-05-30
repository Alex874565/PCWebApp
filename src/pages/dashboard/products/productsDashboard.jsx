import React, { useState, useEffect, useRef } from "react";
import "./productsDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../atoms/navBar/navBar";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortType, setSortType] = useState("alphabetical");
    const [priceSortOrder, setPriceSortOrder] = useState("asc");
    const [groupRefs, setGroupRefs] = useState({});
    const [editProductId, setEditProductId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const mainContentRef = useRef(null);

    useEffect(() => {
        if (localStorage.getItem('token'))
            axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem("token"));
        fetchProducts();
    }, []);

    useEffect(() => {
        const refs = {};
        products.forEach(product => {
            const firstLetter = product.name[0].toUpperCase();
            if (!refs[firstLetter])
                refs[firstLetter] = React.createRef();
        });
        setGroupRefs(refs);
    }, [products]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/products/");
            const sortedProducts = res.data.sort((a, b) => a.name.localeCompare(b.name));
            setProducts(sortedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products. Please try again later.');
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortAlphabeticallyChange = () => {
        setSortType("alphabetical");
        sortProductsAlphabetically();
    };

    const handleSortPriceChange = () => {
        setSortType("price");
        togglePriceSortOrder();
    };

    const togglePriceSortOrder = () => {
        const newSortOrder = priceSortOrder === "asc" ? "desc" : "asc";
        setPriceSortOrder(newSortOrder);
        sortProductsByPrice(newSortOrder);
    };

    const sortProductsAlphabetically = () => {
        const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
        setProducts(sortedProducts);
    };

    const sortProductsByPrice = (order) => {
        const sortedProducts = [...products].sort((a, b) => {
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);
            if (order === "asc")
                return priceA - priceB;
            else
                return priceB - priceA;
        });
        setProducts(sortedProducts);
    };

    const handleEditClick = (product) => {
        setEditProductId(product._id);
        setEditFormData({ ...product });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSaveClick = async (productId) => {
        try {
            await axios.put(`http://localhost:3001/api/products/${productId}`, editFormData);
            const updatedProducts = products.map(product =>
                product._id === productId ? { ...editFormData, _id: productId } : product
            );
            setProducts(updatedProducts);
            setEditProductId(null);
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Failed to update product. Please try again later.');
        }
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
            groupRefs[letter].current.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleTopButtonClick = () => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="sidebar">
                    <ul>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/users_dashboard">Users</Link></li>
                        <li id="active"><Link to="/products_dashboard">Products</Link></li>
                        <li><Link to="/orders_dashboard">Orders</Link></li>
                        <li id="black"><Link to="/">Back to site</Link></li>
                        <li id="website-name">Love4Games</li>
                    </ul>
                </div>
                <div className="main-content" ref={mainContentRef}>
                    <h1>Products Management</h1>
                    <input
                        type="text"
                        placeholder="Search products by name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                    <div className="sort-buttons-container">
                        <button onClick={handleSortAlphabeticallyChange} className="sort-button">
                            Sort Alphabetically
                        </button>
                        <button onClick={handleSortPriceChange} className="sort-button">
                            Sort by Price {priceSortOrder === "desc" ? "(Low to High)" : "(High to Low)"}
                        </button>
                    </div>
                    <div className="card-container">
                        {error ? (
                            <div className="error-message">{error}</div>
                        ) : sortType === "alphabetical" ? (
                            <>
                                <div className="letters-list">
                                    {Object.keys(groupedProducts).sort().map(letter => (
                                        <span key={letter} onClick={() => handleLetterClick(letter)}>
                                            {letter}
                                        </span>
                                    ))}
                                </div>
                                {Object.keys(groupedProducts).sort().map(letter => (
                                    <div key={letter} className="group" ref={groupRefs[letter]}>
                                        <h2>{letter}</h2>
                                        {groupedProducts[letter].map(product => (
                                            <div key={product._id} className="card">
                                                {editProductId === product._id ? (
                                                    <div className="edit-form">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={editFormData.name}
                                                            onChange={handleInputChange}
                                                            className="form-input"
                                                        />
                                                        <textarea
                                                            name="description"
                                                            value={editFormData.description}
                                                            onChange={handleInputChange}
                                                            className="form-textarea"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="launch_date"
                                                            value={editFormData.launch_date}
                                                            onChange={handleInputChange}
                                                            className="form-input"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="genre"
                                                            value={editFormData.genre}
                                                            onChange={handleInputChange}
                                                            className="form-input"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="producer"
                                                            value={editFormData.producer}
                                                            onChange={handleInputChange}
                                                            className="form-input"
                                                        />
                                                        <input
                                                            type="number"
                                                            name="price"
                                                            value={editFormData.price}
                                                            onChange={handleInputChange}
                                                            className="form-input"
                                                        />
                                                        <input
                                                            type="number"
                                                            name="stock"
                                                            value={editFormData.stock}
                                                            onChange={handleInputChange}
                                                            className="form-input"
                                                        />
                                                        <div className="form-buttons">
                                                            <button onClick={() => handleSaveClick(product._id)} className="save-button">
                                                                Save
                                                            </button>
                                                            <button onClick={() => setEditProductId(null)} className="cancel-button">
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <h2>{product.name}</h2>
                                                        <p>Description: {product.description}</p>
                                                        <p>Launch Date: {product.launch_date}</p>
                                                        <p>Genre: {product.genre}</p>
                                                        <p>Producer: {product.producer}</p>
                                                        <p>Price: {product.price}</p>
                                                        <p>Stock: {product.stock}</p>
                                                        <button onClick={() => handleEditClick(product)} className="edit-button">
                                                            Edit
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </>
                        ) : (
                            filteredProducts.map(product => (
                                <div key={product._id} className="card">
                                    {editProductId === product._id ? (
                                        <div className="edit-form">
                                            <input
                                                type="text"
                                                name="name"
                                                value={editFormData.name}
                                                onChange={handleInputChange}
                                                className="form-input"
                                            />
                                            <textarea
                                                name="description"
                                                value={editFormData.description}
                                                onChange={handleInputChange}
                                                className="form-textarea"
                                            />
                                            <input
                                                type="text"
                                                name="launch_date"
                                                value={editFormData.launch_date}
                                                onChange={handleInputChange}
                                                className="form-input"
                                            />
                                            <input
                                                type="text"
                                                name="genre"
                                                value={editFormData.genre}
                                                onChange={handleInputChange}
                                                className="form-input"
                                            />
                                            <input
                                                type="text"
                                                name="producer"
                                                value={editFormData.producer}
                                                onChange={handleInputChange}
                                                className="form-input"
                                            />
                                            <input
                                                type="number"
                                                name="price"
                                                value={editFormData.price}
                                                onChange={handleInputChange}
                                                className="form-input"
                                            />
                                            <input
                                                type="number"
                                                name="stock"
                                                value={editFormData.stock}
                                                onChange={handleInputChange}
                                                className="form-input"
                                            />
                                            <div className="form-buttons">
                                                <button onClick={() => handleSaveClick(product._id)} className="save-button">
                                                    Save
                                                </button>
                                                <button onClick={() => setEditProductId(null)} className="cancel-button">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <h2>{product.name}</h2>
                                            <p>Description: {product.description}</p>
                                            <p>Launch Date: {product.launch_date}</p>
                                            <p>Genre: {product.genre}</p>
                                            <p>Producer: {product.producer}</p>
                                            <p>Price: {product.price}</p>
                                            <p>Stock: {product.stock}</p>
                                            <button onClick={() => handleEditClick(product)} className="edit-button">
                                                Edit
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <button className="top-button" onClick={handleTopButtonClick}>
                ↑
            </button>
        </div>
    );
};

export default Products;
