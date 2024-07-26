
// /app/(admin)/_common/header/components/sidebar.jsx  


'use client';
import React from 'react';
import './sidebar.css'; // Import the global CSS
import Link from 'next/link';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <div className="sidebar-content">
        <h2>Admin Sidebar</h2>
        <ul>
          <li><Link href="/admin/dashboard" onClick={toggleSidebar}>Dashboard</Link></li>
          <li><Link href="/admin/packages" onClick={toggleSidebar}>Packages</Link></li>
          <li><Link href="/admin/users" onClick={toggleSidebar}>Users</Link></li>
          <li><Link href="/admin/settings" onClick={toggleSidebar}>Settings</Link></li>
          <li><Link href="/admin/reports" onClick={toggleSidebar}>Reports</Link></li>
          {/* Add more sidebar items as needed */}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
