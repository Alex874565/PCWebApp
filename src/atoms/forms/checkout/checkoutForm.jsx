import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import './checkoutForm.css'

function CheckoutForm() {
    return (
        <PayPalScriptProvider options={{ clientId: "test" }}>
            {/* Apply the CSS class to center the button */}
            <div className="paypal-button-container">
                <PayPalButtons className="paypal-button" style={{ color: "blue" }} />
            </div>
        </PayPalScriptProvider>
    )
}

export default CheckoutForm;
