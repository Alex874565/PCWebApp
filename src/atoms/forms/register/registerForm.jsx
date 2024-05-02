import './registerForm.css';
import { useState } from 'react';
import $ from 'jquery';

function RegisterForm(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    async function email_validation(){
    
    }

    async function registerPost(){

    }

    async function letters_nums_test(str){
        return await str.match(/^[a-z0-9]*$/);
    }

    function valid_email_test(str){
        return str.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    }

    async function validateForm(){
        $('#register_errors').empty();
        event.preventDefault();
        if(email == "" || username == "" || password == ""){
            $('#register_errors').text("All fields must be completed!");
        }else if (!valid_email_test(email)){
            $('#register_errors').text("Make sure you entered a valid email address.");
        }else if(!letters_nums_test(username) || !letters_nums_test(password)){
            $('#register_errors').text("Forbidden characters. Please only use numbers and lowercase letters for email and password.");
        }else if (username.length >= 16 || password.length >= 16){
            $('#register_errors').text("Username or password too long.");
        }else{
            email_validation();
        }
    }
    
    return (
        <div className='register_form_body'>
        <div id = "register_form">
            <form name = "Form" action = "" onSubmit = {validateForm} method = "POST">
                <label htmlFor = "username"><b>Username</b></label>
                <br />
                <input autoComplete = "off" placeholder = "a-z, 0-9  <30 characters" type = "text" name = "username" id = "register_username" onChange={(e) => setUsername(e.target.value)} />
                <br />
                <br />
                <label htmlFor = "email"><b>Email</b></label>
                <br />
                <input autoComplete = "off" placeholder = "email.address@example.com" type = "text" name = "email" id = "register_email" onChange={(e) => setEmail(e.target.value)} />
                <br />
                <br />
                <label htmlFor = "password"><b>Password</b></label> 
                <br />
                <input autoComplete = "off" placeholder = "a-z, 0-9  <30 characters" type = "password" name = "password" id = "register_password" onChange={(e) => setPassword(e.target.value)}/>
                <br />
                <br />
                <button type = "submit">Register</button>            
            </form>
        </div>
        <div id = "register_errors">
        </div>
    </div>
    )
}

export default RegisterForm