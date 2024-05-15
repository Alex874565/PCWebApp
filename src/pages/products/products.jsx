import { useParams } from "react-router-dom";
import Navbar from "../../atoms/navBar/navBar";
import axios from "axios";
import { useEffect, useState } from "react";
import FilterPanel from "../../atoms/filter/filter";

function Products(){
    const { keyword } = useParams()
    const [products, setProducts] = useState(null)
    const [panelOpen, setPanelOpen] = useState(false);

    function getProducts(){
        axios
            .get(`http://localhost:3001/api/products/keyword/${keyword}`)
            .then((resp) => setProducts(resp.data))
    }
    
    useEffect(() => getProducts(), [])

    const togglePanel = () => {
      setPanelOpen(!panelOpen);
    };

    return (
        <div>
            <Navbar />
            {!panelOpen && <button onClick={togglePanel}>Open Filter</button>}
            <FilterPanel isOpen={panelOpen} onClose={togglePanel}/>
            {!products && 
            <p>No products matching that keyword!</p>
            }
            {console.log(products)}
            {products && products.map((product) => {
                return <li><img src = {product.image}/> {product.name} {product.price}</li>
            })
            }
        </div>
    )
}

export default Products;