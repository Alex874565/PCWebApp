import { GoogleLogin } from '@react-oauth/google';
import Navbar from '../../atoms/navBar/navBar';
import RegisterForm from '../../atoms/forms/register/registerForm'
import GoogleLoginForm from "../../atoms/forms/googleLogin/googleLogin";
import "./register.css";

const Register = () => {
    return (
        <div>
            <Navbar />
            <div className = "register-container">
                <h1 className = "title">Register</h1>
                <RegisterForm />
                <div className = "google-login-wrapper">
                    
                    <p className = "login-with-google-text">Or register with Google?</p>
                    
                    <GoogleLoginForm />
                </div>
            </div>
        </div>
    )
}

export default Register;