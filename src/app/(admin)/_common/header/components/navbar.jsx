// /app/(admin)/_common/header/components/navbar.jsx  

'use client';
import React, { useState } from 'react';
import { FaBars, FaBell, FaGlobe, FaSearch } from 'react-icons/fa';
import './navbar.css'; // Import the global CSS
import logo from '../../../../assets/home_images/logo.png';
import Sidebar from '../../sidebar/components/sidebar';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

function AdminNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const logoutAdmin=async()=>{
    await signOut({
      callbackUrl:'/admin/login',
      redirect:true

    })
  }

  return (
    <div>
      <div className="navbar">
        <div className="navbar_inner">
          <div className="navbar-left">
          <button className="toggle-button" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <div className="logo">
              <Link href={`/admin/dashboard`}>
                <img src={logo.src} alt="Logo" />
              </Link>
            </div>
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
            <div className="notification-button">
              <Link href={`/admin/notifications`}>
                <FaBell className="icon" />
                <span className="notification-badge"></span>
              </Link>
            </div>
            <FaGlobe className="icon" />
            <div className="profile-container">
              <img
                src="https://via.placeholder.com/40" // Placeholder profile photo
                alt="Profile"
                className="profile-photo"
                onClick={togglePopup}
              />
              {popupVisible && (
                <div className="profile-popup">
                  <ul>
                    <li><Link href="/admin/profile">View Profile</Link></li>
                    <li><Link href="/admin/settings">Settings</Link></li>
                    <button onClick={logoutAdmin}>logout</button>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={`wrapper ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
}

export default AdminNavbar;
