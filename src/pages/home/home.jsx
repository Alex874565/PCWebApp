import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import "../../atoms/navBar/navBar.css";
import "../../atoms/slideshow/slideshow.css";
import "../../atoms/footer/footer.css";

import Navbar from "../../atoms/navBar/navBar";
import Slideshow from "../../atoms/slideshow/slideshow";
import AI from "../../atoms/AI/AI";
import Footer from "../../atoms/footer/footer";

const images = [
  'https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/87b026b9-d875-44b3-b42b-68c10e3bd960._CR0%2C0%2C3000%2C600_SX1500_.jpg',
  'https://www.digitalgames.ro/images/2016/10/The-Sims-4-City-Living-Logo-HD.jpg',
  'https://gepig.com/game_cover_bg_1190w/1844.jpg',
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    // Fetch products when the component mounts
    fetch("http://localhost:3001/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    // Fetch reviews when the component mounts
    fetch("http://localhost:3001/api/reviews")
      .then((response) => response.json())
      .then((data) => {
        const ratingsData = data;
        const ratingsMap = {};

        ratingsData.forEach((review) => {
          const { product_id, rating } = review;
          if (!ratingsMap[product_id]) {
            ratingsMap[product_id] = { total: 0, count: 0 };
          }
          ratingsMap[product_id].total += rating;
          ratingsMap[product_id].count += 1;
        });

        const averageRatings = {};
        for (const productId in ratingsMap) {
          averageRatings[productId] = (ratingsMap[productId].total / ratingsMap[productId].count).toFixed(1);
        }
        setRatings(averageRatings);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  function renderStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i < rating) {
        stars.push(<span key={i} className="star half-filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  }

  return (
    <div>
      <Navbar />
      <div className="home">
        <Slideshow images={images} />
        <h2 style={{ paddingLeft: '20px' }}>Trending</h2>
        <ul className="home-products-container">
          {products.slice(0, 5).map((product) => (
            <li key={product._id} className="product-item">
              <Link to={`/product/${product._id}`} className="link">
                <img className="home-product-image" src={product.image} alt={product.name} />
                <p className="home-product-name">{product.name}</p>
                <p className="home-product-price">${product.price}</p>
                <div className="home-product-rating">
                  {ratings[product._id] ? renderStars(ratings[product._id]) : 'No rating available'}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Additional content */}
        
        <h2 style={{ paddingLeft: '20px' }}>Recently Updated</h2>
        <ul className="home-products-container">
          {products.slice(5).map((product) => (
            <li key={product._id} className="home-product-item">
              <Link to={`/product/${product._id}`} className="link">
                <img className="home-product-image" src={product.image} alt={product.name} />
                <p className="home-product-name">{product.name}</p>
                <p className="home-product-price">${product.price}</p>
                <div className="home-product-rating">
                  {ratings[product._id] ? renderStars(ratings[product._id]) : 'No rating available'}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
