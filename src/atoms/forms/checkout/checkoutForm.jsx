import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import './checkoutForm.css'

function checkoutForm(){
    return (
        <PayPalScriptProvider options={{ clientId: "test" }}>
            <PayPalButtons style={{ color: "blue" }} />
        </PayPalScriptProvider>
    )
}

export default checkoutForm;