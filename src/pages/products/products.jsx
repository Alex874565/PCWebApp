import { useParams } from "react-router-dom";
import Navbar from "../../atoms/navBar/navBar";
import axios from "axios";
import { useEffect, useState } from "react";
import FilterPanel from "../../atoms/filter/filter";
import AI from "../../atoms/AI/AI";
import "./products.css"; // Import your CSS file for styling
import { Link } from "react-router-dom";
import Footer from "../../atoms/footer/footer";


function Products() {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [renderedProducts, setRenderedProducts] = useState([]);
  const [producer, setProducer] = useState("");
  const [genre, setGenre] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [ratings, setRatings] = useState({});
  const [producers, setProducers] = useState([""])
  const [genres, setGenres] = useState([""])

  function getProducts() {
    if (keyword === undefined) {
      axios.get(`http://localhost:3001/api/products/keyword/`).then((resp) => {
        setRenderedProducts(resp.data);
        setProducts(resp.data);
      });
    } else {
      axios.get(`http://localhost:3001/api/products/keyword/${keyword}`).then((resp) => {
        setRenderedProducts(resp.data);
        setProducts(resp.data);
      });
    }
  }

  function getRatings() {
    axios.get("http://localhost:3001/api/reviews").then((resp) => {
      const ratingsData = resp.data;
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
    });
  }

  useEffect(() => {
    getProducts();
    getRatings();
  }, []);

  useEffect(() => {
    products.map((product) => {if (producers.indexOf(product.producer) == -1) setProducers([...producers, product.producer])});
    products.map((product) => {if (genres.indexOf(product.genre) == -1) setGenres([...genres, product.genre])})
  }, [products])

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

  function filterProduct(product) {
    if (
      (product.price >= minPrice || !minPrice) &&
      (product.price <= maxPrice || maxPrice === 0 || !maxPrice) &&
      (product.genre === genre || genre === "" || !genre) &&
      (product.producer === producer || producer === "" || !producer)
    ) {
      return product;
    }
  }

  function resetRenderedProducts() {
    setRenderedProducts(products);
  }

  function filterProducts() {
    setRenderedProducts(products.filter((product) => filterProduct(product)));
  }

  function renderFilterPanel() {
    return (
      <div className={`sidepanel ${panelOpen ? 'open' : 'closed'}`}>
        <button className="closeBtn" onClick={togglePanel}>Close</button>
        <div className="filterGroup">
          <label htmlFor="producer">Producer:</label>
          <select onChange={(e) => setProducer(e.target.value)} id="producer" name="producer">
            {producers && producers.map((producer) => (<option key={producer}>{producer}</option>))}
          </select>
        </div>
        <div className="filterGroup">
          <label htmlFor="min_price">MinPrice:</label>
          <input onChange={(e) => setMinPrice(parseFloat(e.target.value))} type="number" id="min_price" name="min_price" />
        </div>
        <div className="filterGroup">
          <label htmlFor="max_price">MaxPrice:</label>
          <input onChange={(e) => setMaxPrice(parseFloat(e.target.value))} type="number" id="max_price" name="max_price" />
        </div>
        <div className="filterGroup">
          <label htmlFor="genre">Genre:</label>
          <select onChange={(e) => setGenre(e.target.value)} id="genre" name="genre">
            {genres && genres.map((genre) => (<option key={genre}>{genre}</option>))}
          </select>
        </div>
        <button className="applyBtn" onClick={filterProducts}>Apply</button>
        <button className="resetBtn" onClick={resetRenderedProducts}>Reset</button>
      </div>
    );
  }

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
      {!panelOpen && <button className="openFilterBtn" onClick={togglePanel}>Open Filter</button>}
      {renderFilterPanel()}
      {!renderedProducts[0] && <p>No products matching that filter/keyword!</p>}
      <h1>List of Products:</h1>
      <ul className="products-container">
        {renderedProducts.map((product) => (
          <li key={product._id} className="product-item">
            <Link to={`/product/${product._id}`} className="link">
              <img className="product-image" src={product.image} alt={product.name} />
              <p className="product-name">{product.name}</p>
              <p className="product-price">${product.price}</p>
              <div className="product-rating">
                {ratings[product._id] ? renderStars(ratings[product._id]) : 'No rating available'}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <AI />
      <Footer />
    </div>
  );
}

export default Products;
