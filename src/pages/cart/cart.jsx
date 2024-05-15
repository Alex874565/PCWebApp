import { useState, useEffect } from "react";
import CheckoutForm from "../../atoms/forms/checkout/checkoutForm";
import Navbar from "../../atoms/navBar/navBar"
import "./cart.css"

function Cart(){
    const [cart, setCart] = useState(null)
    const [total, setTotal] = useState(0)

    useEffect(() => {if(localStorage.getItem("cart")){setCart(JSON.parse(localStorage.getItem("cart")).items)}}, []);
    useEffect(() => {if (cart){var sum = 0; cart.map((product) => {sum += parseInt(product.price)}); setTotal(sum)}}, [cart])

    return (
        <div>
            <Navbar />
            Basket:
            {cart && cart.map((product) => 
                {return (<li key={product}> { product.name } { product.price } { product.count } </li>)})}
            {!cart && <p>Empty!</p>}
            Total: {total}$
            <CheckoutForm />
        </div>
    )
}

export default Cart