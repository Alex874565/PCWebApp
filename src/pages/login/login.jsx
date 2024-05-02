import React from "react";
import Navbar from "../../atoms/navbar/navBar";
import LoginForm from "../../atoms/forms/login/loginForm";
import GoogleLoginForm from "../../atoms/forms/googleLogin/googleLogin";
import "./login.css";

const Login = () => {
    return (
        <div>
            <Navbar />
            <div className = "login-container">
                <h1 className = "title">Log in</h1>
                <LoginForm />
                <div className = "google-login-wrapper">
                    <p className = "login-with-google-text">Or log in with Google?</p>
                    <GoogleLoginForm />
                </div>
            </div>
        </div>
    );
};

export default Login;
