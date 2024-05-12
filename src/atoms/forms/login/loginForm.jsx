import $ from 'jquery';
import { useState } from 'react';
import axios from 'axios';
import './loginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function createPost (email, password) {
        axios
          .post("http://localhost:3001/api/auth/login", {
            email: email,
            password: password,
          })
          .then((response) => {
            console.log(response);
//            this.props.history.push('/home')
          }).catch((err) => {
            console.log(err)
            if(err.response.status == 401){
                window.alert("Wrong email or password!")
            }else{
                window.alert("Connection error!")
            }
          });
    }

    function valid_password_test(str){
        return str.match(/[A-Za-z0-9]{8,20}/);
    }

    function valid_email_test (str) {
        return str.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    }

    async function validateForm() {
        $('#login_errors').empty();
        event.preventDefault();
        console.log(email);
        console.log(password);
        if (email == "" || password == "")
            $('#login_errors').text("All fields must be completed!");
        else if (!valid_email_test(email) || !valid_password_test(password))
            $('#login_errors').text("Please only use numbers and letters for password (min. 8, max. 20) and a valid email address.");
        else if (email.length >= 30 || password.length >= 30)
            $('#login_errors').text("Username or password too long.");
        else
            createPost(email, password)
    }

    return (
        <div className = "login-form-body">
            <div id = "login-form">
                <form name = "Form" action = "" onSubmit = {validateForm} method = "POST">
                    <label htmlFor = "email"><b>Email</b></label>
                    <br />
                    <input autoComplete = "off" placeholder = "email.address@example.com" type = "text" name = "email" id = "login_email" onChange={(e) => setEmail(e.target.value)}/>
                    <br />
                    <br />
                    <label htmlFor = "password"><b>Password</b></label> 
                    <br />
                    <input autoComplete = "off" placeholder = "a-z, 0-9  <30 characters" type = "password" name = "password" id = "login_password" onChange={(e) => setPassword(e.target.value)}/>
                    <br />
                    <br />
                    <button type = "submit">Login</button>            
                </form>
            </div>
            <div id = "login-register">Don't have an account?<br />
                <button onClick = {() => {window.location.href = '/register';}} >Register</button>
            </div>
            <div id = "login_errors">
            </div>
        </div>
    );
}

export default LoginForm;
