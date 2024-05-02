import './registerForm.css';
import { useState } from 'react';
import $ from 'jquery';

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [accountType, setAccountType] = useState("client");
    
    async function email_validation() {
        
    }

    async function registerPost() {
        
    }

    async function letters_nums_test (str) {
        return await str.match(/^[a-z0-9]*$/);
    }

    function valid_email_test (str) {
        return str.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    }

    async function validateForm(event) {
        $('#register-errors').empty();
        event.preventDefault();
        if (email === "" || username === "" || password === "")
            $('#register-errors').text("All fields must be completed!");
        else if (!valid_email_test(email))
            $('#register-errors').text("Make sure you entered a valid email address.");
        else if (!letters_nums_test(username) || !letters_nums_test(password))
            $('#register-errors').text("Forbidden characters. Please only use numbers and lowercase letters for email and password.");
        else if (username.length >= 16 || password.length >= 16)
            $('#register-errors').text("Username or password too long.");
        else
            email_validation();
    }
    
    return (
        <div className = 'register-form-body'>
            <div id = "register-form">
                <form name = "Form" action = "" onSubmit = {validateForm} method = "POST">
                    <label htmlFor = "username"><b>Username</b></label>
                    <br/>
                    <input autoComplete = "off" placeholder = "a-z, 0-9  <30 characters" type = "text" name = "username" id = "register_username" onChange = {(e) => setUsername(e.target.value)} />
                    <br/>
                    <br/>
                    <label htmlFor = "email"><b>Email</b></label>
                    <br/>
                    <input autoComplete = "off" placeholder = "email.address@example.com" type = "text" name = "email" id = "register_email" onChange = {(e) => setEmail(e.target.value)} />
                    <br/>
                    <br/>
                    <label htmlFor = "password"><b>Password</b></label>
                    <br/>
                    <input autoComplete = "off" placeholder="a-z, 0-9  <30 characters" type = "password" name = "password" id = "register_password" onChange = {(e) => setPassword(e.target.value)} />
                    <br/>
                    <br/>
                    <label htmlFor = "account-type"><b>Account Type</b></label>
                    <br/>
                    <select id = "account-type" name = "account-type" onChange = {(e) => setAccountType(e.target.value)}>
                        <option value = "admin">Client</option>
                        <option value = "client">Admin</option>
                        <option value = "distributor">Distributor</option>
                    </select>
                    <br/>
                    <br/>
                    <button type = "submit">Register</button>
                </form>
            </div>
            <div id = "register-errors"></div>
        </div>
    )
}

export default RegisterForm;
