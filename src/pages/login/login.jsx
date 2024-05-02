import GoogleLoginForm from "../../atoms/forms/googleLogin/googleLogin"
import LoginForm from "../../atoms/forms/login/loginForm"
import Navbar from "../../atoms/navBar/navBar"
import './login.css'

const Login = () => {
    return (
    <div>
        <Navbar />
        <LoginForm />
        <p>Or log in with Google?</p>
        <GoogleLoginForm />
    </div>
    )
}

export default Login