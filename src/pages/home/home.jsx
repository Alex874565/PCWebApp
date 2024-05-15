import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./home.css";
import "../../atoms/navBar/navBar.css";
import "../../atoms/slideshow/slideshow.css";
import "../../atoms/footer/footer.css";
import "../../atoms/chatWindow/chatWindow.css";
import Navbar from "../../atoms/navBar/navBar";
import Slideshow from "../../atoms/slideshow/slideshow";
import Footer from "../../atoms/footer/footer";
import ChatWindow from "../../atoms/chatWindow/chatWindow"; // Import the ChatWindow component

const images = [
  'https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/87b026b9-d875-44b3-b42b-68c10e3bd960._CR0%2C0%2C3000%2C600_SX1500_.jpg',
  'https://www.digitalgames.ro/images/2016/10/The-Sims-4-City-Living-Logo-HD.jpg',
  'https://gepig.com/game_cover_bg_1190w/1844.jpg',
];

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products when the component mounts
    fetch("http://localhost:3001/api/products")
      .then((response) => response.json())
      .then((data) => {setProducts(data), console.log(data)})
      .catch((error) => console.error("Error fetching products:", error));
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  return (
    <div>
      <Navbar />
      <div className="home">
        <Slideshow images={images} />
        <h2 style={{ paddingLeft: '20px' }}>Trending</h2>
        <ul className="home-products-container">
          {products.slice(0, 5).map((product) => (
            <li key={product.id} className="product-item">
              <Link to={`/product/${product._id}`} className="link">
                {/* Wrap product with Link */}
                <img className="home-product-image" src={product.image} alt={product.name} />
                <p className="home-product-name">{product.name}</p>
                <p className="home-product-price">${product.price}</p>
              </Link>
            </li>
          ))}
        </ul>
        {/* Additional content */}
        
        {/* Show remaining products */}
        <h2 style={{ paddingLeft: '20px' }}>Recently Updated</h2>
        <ul className="home-products-container">
          {products.slice(5).map((product) => (
            <li key={product.id} className="home-product-item">
              <Link to={`/product/${product._id}`} className="link">
                {/* Wrap product with Link */}
                <img className="home-product-image" src={product.image} alt={product.name} />
                <p className="home-product-name">{product.name}</p>
                <p className="home-product-price">${product.price}</p>
              </Link>
            </li>
          ))}
        </ul>
        {/* Add the ChatWindow component */}
        <ChatWindow />
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
