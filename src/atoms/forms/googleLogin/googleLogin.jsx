import { GoogleLogin } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

const GoogleLoginForm = () => {

    function createPost(email, password, name) {
        axios
          .post("http://localhost:3001/api/auth/google", {
            email: email,
            password: password,
            name: name
          })
          .then((response) => {
            console.log(response);
            localStorage.setItem('user', JSON.stringify(response.data.user))
            axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.token
            console.log(localStorage.getItem('user'))
            //window.location.replace('/')
          });
      }

    function processUser(response) {
        const data = jwtDecode(response.credential)
        createPost(data.email, data.sub, data.given_name);
    }

    return (
    <div className = "google_login_body">
        <GoogleLogin onSuccess={processUser} onError={(error) => console.log('Login Failed:', error)} />
    </div>
    );
}

export default GoogleLoginForm