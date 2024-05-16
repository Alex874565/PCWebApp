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

  function getProducts() {
    if (keyword == undefined) {
      axios.get(`http://localhost:3001/api/products/keyword/`).then((resp) => setProducts(resp.data));
    } else {
      axios.get(`http://localhost:3001/api/products/keyword/${keyword}`).then((resp) => setProducts(resp.data));
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

  return (
    <div>
      <Navbar />
      {!panelOpen && <button className="openFilterBtn" onClick={togglePanel}>Open Filter</button>}
      <FilterPanel isOpen={panelOpen} onClose={togglePanel} />
      {!products[0] && <p>No products matching that keyword!</p>}
      <h1>List of Products:</h1>
        <ul className="products-container">
          {products.map((product) => (
            <li key={product.id} className="product-item"> {/* Added className */}
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
