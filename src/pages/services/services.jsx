import React from "react";
import "./services.css";
import "../../atoms/navBar/navBar.css";
import Navbar from "../../atoms/navBar/navBar";

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
