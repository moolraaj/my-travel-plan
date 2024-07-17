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
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link href="/" className="navbar-item">
            <img src={holiday.src} alt="Holidays" />
            Holidays
          </Link>
          <Link href="/" className="navbar-item">
            <img src={flight.src} alt="Flights" />
            Flights
          </Link>
          <Link href="/" className="navbar-item">
            <img src={ballon.src} alt="Activity" />
            Activity
          </Link>
          <Link href="/" className="navbar-item">
            <img src={destination.src} alt="Destinations" />
            Destinations
          </Link>
          <Link href="/" className="navbar-item">
            <img src={car.src} alt="Transfers" />
            Transfers
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
