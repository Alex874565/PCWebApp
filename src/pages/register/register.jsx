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
                <h1 className = "register_title">Register</h1>
                <RegisterForm />
            </div>
        </div>
    )
}

export default Register;