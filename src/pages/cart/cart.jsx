import { useState, useEffect } from "react";
import CheckoutForm from "../../atoms/forms/checkout/checkoutForm";
import Navbar from "../../atoms/navBar/navBar";
import "./cart.css";

function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (localStorage.getItem("cart")) {
            setCart(JSON.parse(localStorage.getItem("cart")));
        }
    }, []);

    useEffect(() => {
        if (cart) {
            var sum = 0;
            cart.map((product) => {
                sum += parseInt(product.price);
            });
            setTotal(sum);
        }
    }, [cart]);

    function handleMinus(id, e) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i]._id == id) {
                cart[i].count -= 1;
                if (cart[i].count == 0) {
                    cart.splice(i, 1);
                }
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.reload();
    }

    function handlePlus(id, e) {
        for (var i = 0; i < cart.length; i++) {
            console.log(id, cart[i]._id);
            if (cart[i]._id == id) {
                cart[i].count += 1;
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.reload();
    }

    function handleDelete(id, e) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i]._id == id) {
                cart.splice(i, 1);
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.reload();
    }

    return (
        <div>
        <Navbar />
        <div className="cart-container">
            
            <h2>Cart:</h2>
            {cart.length ? (
                cart.map((product) => (
                    <div key={product._id} className="cart-item">
                        <span>{product.name}</span> <span>{product.price}</span> <span>{product.count}</span>
                        <button className="cart-button" onClick={() => handleMinus(product._id)}>-</button>
                        <button className="cart-button" onClick={() => handlePlus(product._id)}>+</button>
                        <button className="cart-button" onClick={() => handleDelete(product._id)}>Remove</button>
                    </div>
                ))
            ) : (
                <p className="empty-cart-message">Empty cart!</p>
            )}
            {cart.length > 0 && <div className="cart-total">Total: {total}$</div>}
            <CheckoutForm />
        </div>
        </div>
    );
}

export default Cart;
