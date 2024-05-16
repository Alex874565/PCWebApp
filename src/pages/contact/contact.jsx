import React from "react";
import "./contact.css";
import "../../atoms/navBar/navBar.css";
import Navbar from "../../atoms/navBar/navBar";
import Footer from "../../atoms/footer/footer"

const Contact = () => {
    return (
        <div>
            <Navbar />
            <div className="contact-page">
                <h1>Contact Us</h1>
                
                <div className="people">
                    <div className="person" id="alex">
                        <img src="../../../images/alex.jpg" alt="" />
                        <p>
                            <span>Alexandru Cărpinișan</span><br/>
                            +40 737 103 418 <br/>
                            <a href="mailto:alex.carpinisan@gmail.com">alex.carpinisan@gmail.com</a>
                        </p>
                    </div>

                    <div className="person" id="roxana">
                        <img src="../../../images/roxi.jpg" alt="" />
                        <p>
                            <span>Roxana Keller</span><br/>
                            +40 722 425 422 <br/>
                            <a href="mailto:kellerroxana30@gmail.com">kellerroxana30@gmail.com</a>
                        </p>
                    </div>

                    <div className="person" id="letitia">
                        <img src="../../../images/leti.jpg" alt="" />
                        <p>
                            <span>Letiția Iliescu</span><br/>
                            +40 770 915 325 <br/>
                            <a href="mailto:letitia.iliescu@gmail.com">letitia.iliescu@gmail.com</a>
                        </p>
                    </div>
                </div>
                <hr />
            </div>
            <Footer/>
        </div>
    );
};

export default Contact;
