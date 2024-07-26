
// /app/(admin)/_common/header/components/navbar.jsx  

'use client';
import React, { useState } from 'react';
import { FaBars, FaBell, FaGlobe, FaSearch } from 'react-icons/fa';
import './navbar.css'; // Import the global CSS
import logo from '../../../../assets/home_images/logo.png';
import Sidebar from '../../sidebar/components/sidebar';
import Link from 'next/link';


function AdminNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      
      <div className="navbar">
        <div className="navbar_inner">
        <div className="navbar-left">
          <button className="toggle-button" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <div className="logo"><Link href={`/admin/dashboard`}><img src={logo.src} alt="Logo" /></Link></div>
        </div>
        <div className="navbar-center">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
          />
        </div>
        <div className="navbar-right">
          <FaBell className="icon" />
          <FaGlobe className="icon" />
          <img
            src="https://via.placeholder.com/40" // Placeholder profile photo
            alt="Profile"
            className="profile-photo"
          />
        </div>
        </div>
      </div>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default AdminNavbar;
