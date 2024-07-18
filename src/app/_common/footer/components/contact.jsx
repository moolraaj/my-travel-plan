// components/contactLinks.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';


const ContactLinks = () => {
  return (
    <div className="contact-links-container">
      <div className="other-links">
        <h3 className="contact-title">Contact Us</h3>
        <ul className="contact-list">
          <li className="contact-item"><a href="tel:8627814388">+918627814388</a></li>
          <li className="contact-item"><a href="maito:booking@streetromeo.com ">booking@streetromeo.com </a></li>
        </ul>
      </div>
      <div className="address-us">
        <h3 className="contact-title">Address Us :</h3>
        <div className="address-description">
         <p>Corporate Office: 401, Time Shoppers, Opp. Deepkamal Mall, Sarthana Jakatnaka, Surat | Gujarat</p>
        </div>
      </div>
    </div>
  );
};

export default ContactLinks;
