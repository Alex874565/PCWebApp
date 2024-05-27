import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./product.css";
import Navbar from "../../atoms/navBar/navBar";
import Footer from "../../atoms/footer/footer";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);
    const [user, setUser] = useState(null);
    const [newReview, setNewReview] = useState({ rating: "", comment: "" });

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/products/?_id=${id}`)
        .then((response) => setProduct(response.data[0]))
        .catch((error) => console.error("Error fetching product details:", error));

        axios.get(`http://localhost:3001/api/reviews/product/${id}`)
        .then((response) => {
            const data = response.data;
            setReviews(data);
            const totalRating = data.reduce((sum, review) => sum + review.rating, 0);
            const average = (totalRating / data.length).toFixed(1);
            setAverageRating(average);
        })
        .catch((error) => console.error("Error fetching reviews:", error));
    }, [id]);

    const handleAddToCart = () => {
        const cart = localStorage.getItem("cart");
        let items = cart ? JSON.parse(cart) : [];
        let exists = false;

        items = items.map((item) => {
            if (product._id === item._id) {
                item.count += 1;
                exists = true;
            }
            return item;
        });

        if (!exists)
            items.push({ ...product, count: 1 });

        localStorage.setItem("cart", JSON.stringify(items));
        console.log("Product added to cart:", product);
        setAddedToCart(true);
    };

    const handleDeleteReview = (reviewId) => {
        axios.delete(`http://localhost:3001/api/reviews/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
        })
        .then(() => {
            setReviews(reviews.filter((review) => review._id !== reviewId));
        })
        .catch((error) => console.error("Error deleting review:", error));
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const reviewData = {
            ...newReview,
            product_id: id,
            user: user ? user.name : "Anonymous",
            date: new Date().toLocaleDateString()
        };

        axios.post(`http://localhost:3001/api/reviews`, reviewData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            }
        })
        .then((response) => {
            setReviews([...reviews, response.data]);
            setNewReview({ rating: "", comment: "" });
        })
        .catch((error) => console.error("Error adding review:", error));
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key = {i} className = {i <= rating ? "star filled" : "star"}>★</span>
            );
        }
        return stars;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (!product)
        return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <div className = "productpage-product-container">
                <img src = {product.image} alt = {product.name} className = "productpage-product-image" />
                <div className = "productpage-product-details">
                    <h1>{product.name}</h1>
                    <p style = {{ color: 'red', fontSize: '24px' }}>${product.price}</p>
                    <p>{product.description}</p>
                    <p>Launch Date: {formatDate(product.launch_date)}</p>
                    <p>Genre: {product.genre}</p>
                    <p>Producer: {product.producer}</p>
                    <div className = "productpage-rating">
                        <h3>Average Rating:</h3>
                        <div className = "stars">{renderStars(averageRating)}</div>
                        <p>{averageRating} out of 5</p>
                    </div>
                    { localStorage.getItem("user") ? (
                        <button onClick = {handleAddToCart}>Add to Cart</button>
                    ) : (
                        <button onClick = {() => window.location.assign("/login")}>Log In to Add to Cart</button>
                    )}
                    { addedToCart && <p style={{ color: 'green' }}>Added to Cart</p> }
                </div>
            </div>
            <div className = "productpage-reviews">
                <h2>Reviews</h2>
                {reviews.map((review) => (
                    <div key = {review._id} className = "review">
                        <h4>{review.user}</h4>
                        <div className = "stars">{renderStars(review.rating)}</div>
                        <p>{review.comment}</p>
                        {user && ["Admin", "Distributor"].indexOf(user.role) !== -1 && (
                            <button onClick = {() => handleDeleteReview(review._id)}>Delete Review</button>
                        )}
                    </div>
                ))}
                { user && (
                    <div className = "add-review">
                        <h3>Add a Review</h3>
                        <form onSubmit = {handleReviewSubmit}>
                            <div className = "form-group">
                                <label htmlFor = "rating">Rating:</label>
                                <select
                                    id="rating"
                                    value = {newReview.rating}
                                    onChange = {(e) => setNewReview({ ...newReview, rating: e.target.value })}
                                    required
                                >
                                    <option value = "">Select Rating</option>
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <option key = {num} value = {num}>{num}</option>
                                    ))}
                                </select>
                            </div>
                            <div className = "form-group">
                                <label htmlFor = "comment">Comment:</label>
                                <textarea
                                    id = "comment"
                                    value = {newReview.comment}
                                    onChange = {(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    required
                                />
                            </div>
                            <button type = "submit" className = "btn btn-primary">Submit Review</button>
                        </form>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ProductPage;
