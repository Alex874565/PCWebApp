import { useState, useEffect } from "react";
import CheckoutForm from "../../atoms/forms/checkout/checkoutForm";
import Navbar from "../../atoms/navBar/navBar"
import "./cart.css"

function Cart(){
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {if(localStorage.getItem("cart")){setCart(JSON.parse(localStorage.getItem("cart")))}}, []);
    useEffect(() => {if (cart){var sum = 0; cart.map((product) => {sum += parseInt(product.price)}); setTotal(sum)}}, [cart])

    function handleMinus(id, e){
        for(var i = 0; i < cart.length; i++){
            if(cart[i]._id == id){
                cart[i].count -= 1;
                if(cart[i].count == 0){
                    cart.splice(i, 1)
                }
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart))
        window.location.reload()
    }


    function handlePlus(id, e){
        for(var i = 0; i < cart.length; i++){
            console.log(id, cart[i]._id)
            if(cart[i]._id == id){
                cart[i].count += 1;
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart))
        window.location.reload()
    }

    function handleDelete(id, e){
        for(var i = 0; i < cart.length; i++){
            if(cart[i]._id == id){
                cart.splice(i, 1);
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart))
        window.location.reload()
    }

    return (
        <div>
            <Navbar />
            Basket:
            {console.log(cart)}
            {cart.length && cart.map((product) => 
                {
                return (
                <li key={product._id}> { product.name } { product.price } { product.count } 
                <button onClick={handleMinus.bind(this, product._id)}>-</button>
                <button onClick={handlePlus.bind(this, product._id)}>+</button>
                <button onClick={handleDelete.bind(this, product._id)}>Remove</button>
                </li>)})}
            {!cart.length && <p style={{color: "black"}}>Empty cart!</p>}
            Total: {total}$
            <CheckoutForm />
        </div>
    )
}

export default Cart