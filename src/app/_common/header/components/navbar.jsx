// components/Navbar.js
'use client';
import Link from 'next/link';
import { useState } from 'react';
import ballon from '../../../assets/home_images/ballon.png';
import car from '../../../assets/home_images/car.png';
import holiday from '../../../assets/home_images/holiday.png';
import destination from '../../../assets/home_images/dest.png';
import flight from '../../../assets/home_images/flight.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import menubar from '../../../assets/home_images/menu.svg';
import closebar from '../../../assets/home_images/close-menu.svg';




const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
        <FontAwesomeIcon icon="fa-solid fa-bars" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="navbar-toggle"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 20L4 4M20 4L4 20" stroke="#CA1E2A" stroke-width="2" stroke-linecap="round"/>
              </svg>
              
            ) : (
             
              <img src={menubar.src}></img>
            )}
          </button>
        </div>
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link href={"/"} className="navbar-item">
            <img src={holiday.src} alt="Holidays" />
            Holidays
          </Link>
          <Link href="/flights" className="navbar-item">
            <img src={flight.src} alt="Flights" />
            Flights
          </Link>
          <Link href={"/activity"} className="navbar-item">
            <img src={ballon.src} alt="Activity" />
            Activity
          </Link>
          <Link href="/destinations" className="navbar-item">
            <img src={destination.src} alt="Destinations" />
            Destinations
          </Link>
          <Link href="/transfers" className="navbar-item">
            <img src={car.src} alt="Transfers" />
            Transfers
          </Link>
          <button className="contact-button mobile-button"><a href='/contact-us'>Contact Us</a></button>
          
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
