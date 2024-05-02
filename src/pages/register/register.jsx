import { GoogleLogin } from '@react-oauth/google';
import RegisterForm from '../../atoms/forms/register/registerForm'
import Navbar from '../../atoms/navBar/navBar';

const Register = () => {
    return (
        <div id="register_body">
            <Navbar />
            <RegisterForm />
            <p> Or register with Google? </p>
            <GoogleLogin />
        </div>
    )
}

export default Register;