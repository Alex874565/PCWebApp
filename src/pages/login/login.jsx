import React from "react";
import Navbar from "../../atoms/navBar/navBar";
import LoginForm from "../../atoms/forms/login/loginForm";
import GoogleLoginForm from "../../atoms/forms/googleLogin/googleLogin";
import "./login.css";
import "../../atoms/forms/googleLogin/googleLogin.css";
import Footer from "../../atoms/footer/footer"

const Login = () => {
    return (
        <div>
            <Navbar />
            <div className = "login-container">
                <h1 className = "login_title">Log in</h1>
                <LoginForm />
            </div>
        
        </div>
    );
};

export default Login;