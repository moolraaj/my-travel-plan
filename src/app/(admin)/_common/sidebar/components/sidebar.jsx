
// /app/(admin)/_common/header/components/sidebar.jsx  


'use client';
import React from 'react';
import './sidebar.css'; // Import the global CSS

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <div className="sidebar-content">
        <h2>Admin Sidebar</h2>
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Users</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Reports</a></li>
          {/* Add more sidebar items as needed */}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
