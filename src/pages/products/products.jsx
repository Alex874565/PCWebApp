import { useParams } from "react-router-dom";
import Navbar from "../../atoms/navBar/navBar";
import axios from "axios";
import { useEffect, useState } from "react";
import FilterPanel from "../../atoms/filter/filter";
import AI from "../../atoms/AI/AI";

function Products(){
    const { keyword } = useParams()
    const [products, setProducts] = useState([])
    const [panelOpen, setPanelOpen] = useState(false);

    function getProducts(){
        if(keyword == undefined){
            axios
                .get(`http://localhost:3001/api/products/keyword/`)
                .then((resp) => setProducts(resp.data))
        }else{
            axios
                .get(`http://localhost:3001/api/products/keyword/${keyword}`)
                .then((resp) => setProducts(resp.data))
        }
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
            {!products[0] && 
            <p>No products matching that keyword!</p>
            }
            {console.log(products)}
            {products[0] && products.map((product) => {
                return <li key={product._id}><img src = {product.image}/> {product.name} {product.price}</li>
            })
            }
            <AI />
        </div>
    )
}

export default Products;