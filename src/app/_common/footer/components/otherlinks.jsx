// components/FooterLinks.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';


const FooterLinks = () => {
  return (
    <div className="footer-links-container">
      <div className="other-links">
        <h3 className="footer-title">Other Links</h3>
        <ul className="footer-list">
          <li className="footer-item">Privacy Policy</li>
          <li className="footer-item">Terms of Service</li>
          <li className="footer-item">Disclaimer</li>
        </ul>
      </div>
      <div className="follow-us">
        <h3 className="footer-title">Follow Us :</h3>
        <div className="social-icons">
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          <FontAwesomeIcon icon={faTwitter} className="social-icon" />
          <FontAwesomeIcon icon={faYoutube} className="social-icon" />
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
