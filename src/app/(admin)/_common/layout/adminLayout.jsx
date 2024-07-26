// /app/(admin)/_common/layout/adminLayout.jsx
'use client';
import React from 'react';
import AdminNavbar from '../header/components/navbar';
import Adminfooter from '../footer/components/footer';

function AdminLayout({children}) {
  return (
    <div>
      <AdminNavbar/>
      {children}
      <Adminfooter/>
    </div>
  );
}

export default AdminLayout;
