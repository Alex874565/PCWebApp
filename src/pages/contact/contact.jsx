import React from "react";
import "./contact.css";
import "../../atoms/navbar/navBar.css";
import Navbar from "../../atoms/navbar/navBar";

const Contact = () => {
    return (
        <div>
            <Navbar />
            <div className="contact-page">
                <h1>Contact Us</h1>
                
                <div className="people">
                    <div className="person" id = "alex">
                        <img src="../../../images/alex.jpg" alt="" />
                        <p>
                            <span>Alexandru Carpinisan</span><br/>
                            +40 737 103 418 <br/>
                            -@gmail.com
                        </p>
                    </div>

                    <div className="person" id = "roxana">
                        <img src="../../../images/roxi.jpg" alt="" />
                        <p>
                            <span>Roxana Keller</span><br/>
                            +40 722 425 422 <br/>
                            kellerroxana30@gmail.com
                        </p>
                    </div>

                    <div className="person" id = "letitia">
                        <img src="../../../images/leti.jpg" alt="" />
                        <p>
                            <span>Letitia Iliescu</span><br/>
                            +40 770 915 325 <br/>
                            letitia.iliescu@gmail.com
                        </p>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default Contact;
