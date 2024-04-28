import React from "react";
import "./about.css";
import "../../atoms/navbar/navBar.css";
import Navbar from "../../atoms/navbar/navBar";

const About = () => {
    return (
        <div>
            <Navbar/>
            <div className="about-page">
                <h1>About us</h1>
                
                <div className="text">
                    <p>Welcome to Love4Games, your ultimate destination for all 
                        things gaming! We are a dynamic team of three computer science 
                        students with a shared passion for video games and technology, 
                        dedicated to bringing the joy of gaming to enthusiasts worldwide.</p>

                    <p>As avid gamers ourselves, we understand the thrill of discovering 
                        new worlds, mastering challenges, and connecting with fellow 
                        players. That's why we founded Love4Games - to create a curated 
                        platform where gamers can explore an extensive collection of 
                        titles, from classics to the latest releases, all in one place.</p>

                    <p>Driven by our love for gaming and fueled by our technical 
                        expertise, we are committed to providing an unparalleled 
                        shopping experience for our customers. Whether you're a 
                        hardcore gamer seeking adrenaline-pumping action or a casual 
                        player looking for family-friendly fun, we have something for 
                        everyone.</p>
                        
                    <p>At Love4Games, we pride ourselves on offering a 
                        seamless browsing and purchasing experience. Our user-friendly 
                        interface, secure payment options, and prompt customer support 
                        ensure that your journey from selecting your favorite game to 
                        diving into gameplay is smooth and enjoyable.</p>

                    <p>But we're not just a store - we're a community. We believe in 
                        fostering connections and sharing experiences that transcend 
                        the boundaries of screens. That's why we're dedicated to building 
                        a vibrant gaming community where players can connect, compete, 
                        and celebrate their passion for gaming together.</p>

                    <p>Thank you for choosing Love4Games as your gaming destination. 
                        We're excited to embark on this adventure with you and help you 
                        level up your gaming experience!</p>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default About;
