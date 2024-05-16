import { useEffect } from "react";
import axios from "axios";

export default function authToken(){
    useEffect(
        () => {if(localStorage.getItem('token')){axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem("token"))}}, 
        []
    )
}