import './registerForm.css';
import { useState } from 'react';
import $ from 'jquery';
import axios from 'axios'

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [ code, setCode ] = useState(null)
    
    async function validateEmail(){
        const new_code = Math.floor(100000 + Math.random() * 900000);
        setCode(new_code)
        axios
          .post("http://localhost:3001/api/auth/mail", {
            email: email,
            code: new_code
          })
          .then((response) => {
            console.log(response);
          }).catch((err) => {
            console.log(err)
            window.alert("Error mailing code...")
          });
    }

    async function registerPost(){
        axios
          .post("http://localhost:3001/api/auth/register", {
            email: email,
            password: password,
            name: username
          })
          .then((response) => {
            console.log(response);
            window.alert("Registered successfully!")
          }).catch((err) => {
            if(err.request.status == 409){
                window.alert("Email already in use!")
            }else{
                window.alert("Connection error!")
            }
          });
    }

    async function letters_nums_test (str) {
        return await str.match(/^[a-z0-9]*$/);
    }

    function valid_password_test(str){
        return str.match(/[A-Za-z0-9]{8,20}/);
    }

    function valid_email_test(str){
        return str.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    }

    function checkEmail(){
        return axios
          .post("http://localhost:3001/api/auth/check_email", {
            email: email
          })
          .then((response) => {
            return (response.data != 0);
          }).catch((err) => {
            console.log(err)
            return "err"
          });
    }

    async function validateForm(){
        $('#register_errors').empty();
        event.preventDefault();
        if(email == "" || username == "" || password == ""){
            $('#register_errors').text("All fields must be completed!");
        }else if (!valid_email_test(email)){
            $('#register_errors').text("Make sure you entered a valid email address.");
        }else if(!letters_nums_test(username)){
            $('#register_errors').text("Forbidden characters. Please only use numbers and lowercase letters for name and password.");
        }else if(!valid_password_test(password)){
            $('#register_errors').text("Please only use numbers and letters for password (min. 8, max. 20).");
        }else if (username.length >= 16 || password.length >= 16){
            $('#register_errors').text("Username or password too long.");
        }else{
            const emailExists = await checkEmail();
            if(emailExists == true){
                window.alert("Email already in use!");
            }else{
                validateEmail();
            }
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
            {
                code && 
                <div id="code_form">
                    <input autoComplete = "off" placeholder = "insert code" type = "text" name = "code" id = "code_field"/>
                    <button id = "code_button" onClick={() => {if(parseInt($('#code_field').val()) == code) {registerPost()} else {window.alert("Wrong code!")} }}>Submit Code</button>
                </div>
            }
    </div>
    )
}

export default RegisterForm;
