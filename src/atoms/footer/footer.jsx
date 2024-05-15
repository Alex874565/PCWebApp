import React from 'react';
import './footer.css'; // Import CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer__copyright">
        <p>&copy; {new Date().getFullYear()} Love4Games. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
