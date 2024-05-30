import React, { useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import './registerForm.css';
import { Link } from 'react-router-dom';
import GoogleLoginForm from '../googleLogin/googleLogin';

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState(null);
    const [gdprConsent, setGdprConsent] = useState(false);
    const [errors, setErrors] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function validateEmail() {
        const new_code = Math.floor(100000 + Math.random() * 900000);
        setCode(new_code);
        axios
            .post("http://localhost:3001/api/auth/mail", {
                email: email,
                code: new_code
            })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
                window.alert("Error mailing code...");
            });
        window.alert("Registration code sent on email. Fill it in the box below.")
    }

    async function registerPost() {
        axios
            .post("http://localhost:3001/api/auth/register", {
                email: email,
                password: password,
                name: username
            })
            .then((response) => {
                console.log(response);
                window.alert("Registered successfully!");
            })
            .catch((err) => {
                if (err.request.status === 409)
                    window.alert("Email already in use!");
                else
                    window.alert("Connection error!");
            });
    }

    async function letters_nums_test(str) {
        return await str.match(/^[a-z0-9]*$/);
    }

    function valid_password_test(str) {
        return str.match(/[A-Za-z0-9]{8,20}/);
    }

    function valid_email_test(str) {
        return str.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    }

    function checkEmail() {
        return axios
            .post("http://localhost:3001/api/auth/check_email", {
                email: email
            })
            .then((response) => {
                return response.data !== 0;
            })
            .catch((err) => {
                console.log(err);
                return "err";
            });
    }

    async function validateForm(event) {
        event.preventDefault();
        $('#register-errors').empty();
        if (email === "" || username === "" || password === "") {
            setErrors("All fields must be completed!");
        } else if (!valid_email_test(email)) {
            setErrors("Make sure you entered a valid email address.");
        } else if (!await letters_nums_test(username)) {
            setErrors("Forbidden characters. Please only use numbers and lowercase letters for name and password.");
        } else if (!valid_password_test(password)) {
            setErrors("Please only use numbers and letters for password (min. 8, max. 20).");
        } else if (username.length >= 16 || password.length >= 16) {
            setErrors("Username or password too long.");
        }else if (confirmPassword != password){
            setErrors("Passwords do not match.")
        } else if (!gdprConsent) {
            setErrors("You must agree to the terms and conditions.");
        } else {
            const emailExists = await checkEmail();
            if (emailExists === true) {
                window.alert("Email already in use!");
            } else {
                validateEmail();
            }
        }
    }

    return (
        <div className='register-form-body'>
            <div id="register-form">
                <form name="Form" action="" onSubmit={validateForm} method="POST">
                    <div className="form-row">
                        <label htmlFor="username"><b>Username</b></label>
                        <input
                            autoComplete="off"
                            placeholder="a-z, 0-9  <30 characters"
                            type="text"
                            name="username"
                            id="register_username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="email"><b>Email</b></label>
                        <input
                            autoComplete="off"
                            placeholder="email.address@example.com"
                            type="text"
                            name="email"
                            id="register_email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="password"><b>Password</b></label>
                        <input
                            autoComplete="off"
                            placeholder="a-z, 0-9  <30 characters"
                            type="password"
                            name="password"
                            id="register_password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="confirm_password"><b>Confirm Password</b></label>
                        <input
                            autoComplete="off"
                            placeholder="a-z 0-9, 8-20 characters"
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="gdpr-consent">
                        <input
                            type="checkbox"
                            name="gdprConsent"
                            id="gdprConsent"
                            checked={gdprConsent}
                            onChange={(e) => setGdprConsent(e.target.checked)}
                        />
                        <label id="gdpr-label" htmlFor="gdprConsent">I agree to the <Link to ='/gdpr'>terms and conditions</Link></label>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
            <GoogleLoginForm />
            {errors && <div id="register-errors">{errors}</div>}
            {code && (
                <div id="code-form">
                    <input
                        autoComplete="off"
                        placeholder="insert code"
                        type="text"
                        name="code"
                        id="code-field"
                    />
                    <button
                        id="code-button"
                        onClick={() => {
                            if (parseInt($('#code-field').val()) === code) {
                                registerPost();
                            } else {
                                window.alert("Wrong code!");
                            }
                        }}
                    >
                        Submit Code
                    </button>
                </div>
            )}
        </div>
    );
}

export default RegisterForm;
