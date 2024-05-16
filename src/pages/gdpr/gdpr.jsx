import React, { useState } from "react";
import "./gdpr.css";
import Footer from "../../atoms/footer/footer";
import Navbar from "../../atoms/navBar/navBar";

const GDPR = ({ onConsent }) => {
  const [consent, setConsent] = useState(localStorage.getItem("gdprConsent") === "true");

  const handleConsentChange = (e) => {
    const isChecked = e.target.checked;
    setConsent(isChecked);
    localStorage.setItem("gdprConsent", isChecked);
    if (isChecked) {
      onConsent();
    }
  };

  return (
    <div>
        <Navbar/>
    
    <div className="gdpr-container">
      <h2>GDPR Consent</h2>
      <p>
        We value your privacy and are committed to protecting your personal data.
        In compliance with the General Data Protection Regulation (GDPR), we need
        your consent to store and process your personal information. By providing
        your consent, you agree to the following:
      </p>
      <ul>
        <li>We will store your personal information securely.</li>
        <li>We will use your personal information to provide you with our services.</li>
        <li>We will not share your personal information with third parties without your consent.</li>
      </ul>
      </div>
      <Footer/>
    </div>
  );
};

export default GDPR;
