import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [ keyword, setKeyword ] = useState("");
  const [ products, setProducts ] = useState([])
  const [ filteredProducts, setFilteredProducts ] = useState([])
  function getProducts() {
      axios.get(`http://localhost:3001/api/products/`).then((resp) => {
          setProducts(resp.data);
      });
  }

  useEffect(() => {
    getProducts();
  });

  useEffect(() => {
    if (keyword) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredProducts(filtered);
      console.log("Filtered products:", filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [keyword, products]);

  return (
    <div className="search-bar">
      <input list = "products" value = {keyword} onKeyUp={(e) => {if(e.keyCode == 13){window.location.href = `/products/${keyword}`;}}} onChange={(e) => {setKeyword(e.target.value)}} type="text" placeholder="Search games" />
      <datalist id="products">
        {filteredProducts && filteredProducts.map(lo => {return (<option key={lo.name} value={lo.name} />)})}
      </datalist>
      <button onClick={() => (window.location.href = `/products/${keyword}`)}>Search</button>
    </div>
  );
}

export default SearchBar;
