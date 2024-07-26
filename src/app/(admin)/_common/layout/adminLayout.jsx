// /app/(admin)/_common/layout/adminLayout.jsx
'use client';
import React from 'react';
import '../../Admin.css';
import AdminNavbar from '../header/components/navbar';
import Adminfooter from '../footer/components/footer';

function AdminLayout({children}) {
  return (
    <div>
      <AdminNavbar/>
      <div className='admin_layout'>
      {children}
      </div>
      <Adminfooter/>
    </div>
  );
}

export default AdminLayout;
