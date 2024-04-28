import React from "react";
import "./services.css";
import "../../atoms/navbar/navBar.css";
import Navbar from "../../atoms/navbar/navBar";

const Services = () => {
    return (
        <div>
            <Navbar/>
            <div className="services-page">
                <h1>Our services</h1>
            </div>
        </div>
    );
};

export default Services;
