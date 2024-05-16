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
  const [genre, setGenre] = useState("")
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)

  function getProducts() {
    if (keyword == undefined) {
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

  useEffect(() => {
    getProducts();
  }, []);


  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

  function filterProduct(product){
    if((product.price >= minPrice || !minPrice) && (product.price <= maxPrice || maxPrice == 0 || !maxPrice)){
        if(product.genre == genre || genre == "" || !genre){
            if(product.producer == producer || producer == "" || !producer){
                return product
            }
        }
    }
  }

  function resetRenderedProducts(){
    setRenderedProducts(products);
  }

  function filterProducts(){
    setRenderedProducts(products.filter(product => filterProduct(product)))
  }

 function renderFilterPanel(){
    return (<div className={`sidepanel ${panelOpen ? 'open' : 'closed'}`}>
        <button className="closeBtn" onClick={togglePanel}>Close</button>
        <div className="filterGroup">
          <label htmlFor="producer">Producer:</label>
          <input onChange={(e) => setProducer(e.target.value)} type="text" id="producer" name="producer" />
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
          <input onChange={(e) => setGenre(e.target.value)} type="text" id="genre" name="genre" />
        </div>
        <button className="applyBtn" onClick={filterProducts}>Apply</button>
        <button className="resetBtn" onClick={resetRenderedProducts}>Reset</button>
      </div>
    );
 }

  return (
    <div>
      <Navbar />
      {!panelOpen && <button className="openFilterBtn" onClick={togglePanel}>Open Filter</button>}
      {renderFilterPanel()}
      {console.log(renderedProducts)}
      {!renderedProducts[0] && <p>No products matching that filter/keyword!</p>}
      <h1>List of Products:</h1>
        <ul className="products-container">
          {renderedProducts.map((product) => (
            <li key={product._id} className="product-item"> {/* Added className */}
              <Link to={`/product/${product._id}`} className="link">
                {/* Wrap product with Link */}
                <img className="product-image" src={product.image} alt={product.name} />
                <p className="product-name">{product.name}</p>
                <p className="product-price">${product.price}</p>
              </Link>
            </li>
          ))}
        </ul>
      <AI />
      <Footer/>
    </div>
  );
}

export default Products;
