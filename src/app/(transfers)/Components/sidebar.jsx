// components/WelcomeCard.js
import React from 'react';
import planesidebar from '../../assets/home_images/plane.gif';

const WelcomeCard = () => {
  return (
    <div className="sidebar-enquiry">
      <img src={planesidebar.src}alt="Plane" className="plane" />
      <div className="enquiry-section">
        <div className="planetitle">Welcome to Street romeo.</div>
        <button className="planebutton">Enquiry Now</button>
      </div>
    </div>
  );
};

export default WelcomeCard;
