import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./product.css"; // Assuming you have additional CSS in this file
import Navbar from "../../atoms/navBar/navBar";
import Footer from "../../atoms/footer/footer";

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from URL params
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product details based on the ID
    fetch(`http://localhost:3001/api/products/?_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data[0]);
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]); // Re-fetch product details when ID changes

  const handleAddToCart = () => {
    // Implement your add to cart logic here
    const cart = localStorage.getItem("cart")
    if(cart){
      var items = JSON.parse(cart)
      var exists = false;
      items.map((item) => {if(product._id == item._id){
        item.count += 1;
        exists = true;
      }})
      if(!exists){
        items.push(product)
        items[items.length - 1].count = 1;
      }
    }else{
      var items = []
      items.push(product);
      items[items.length - 1].count = 1;
    }
    localStorage.setItem("cart", JSON.stringify(items));
    console.log("Product added to cart:", product);
  };

  // Function to format date in a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar/>
      <div className="product-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-details">
          <h1>{product.name}</h1>
          <p style={{ color: 'red', fontSize: '24px' }}>${product.price}</p>
          <p>{product.description}</p>
          <p>Launch Date: {formatDate(product.launch_date)}</p>
          <p>Genre: {product.genre}</p>
          <p>Producer: {product.producer}</p>
          {/* Add more details as needed */}
          {localStorage.getItem("user") &&
            <button onClick={handleAddToCart}>Add to Cart</button>
          }
          {!localStorage.getItem("user") &&
            <button onClick={() => {window.location.assign("/login")}}>Log In to Add to Cart </button>
          }
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductPage;
