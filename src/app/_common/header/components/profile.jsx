// components/ContactUs.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="icon-container">
        <FontAwesomeIcon icon={faUser} className="user-icon" />
      </div>
      <button className="contact-button">Contact Us</button>
    </div>
  );
};

export default ContactUs;
