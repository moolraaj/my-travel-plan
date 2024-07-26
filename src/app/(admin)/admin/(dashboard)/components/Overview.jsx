'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarCheck, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


function Overview() {
  return (
    <div className="overview">
      <h2>Dashboard Overview</h2>
      <div className="overview-cards">
        <Link href={`/admin/packages`} ></Link>
        <div className="overview-card">
            <div className='icon_wrap'><FontAwesomeIcon icon={faUsers} className="overview-icon" /></div>
            <div className='data_wrap'><h3>Total Users</h3>
            <p>1,234</p></div>
        </div>
        <div className="overview-card">
        <div className='icon_wrap'><FontAwesomeIcon icon={faCalendarCheck} className="overview-icon" /></div>
        <div className='data_wrap'><h3>Total Bookings</h3>
        <p>567</p></div>
        </div>
        <div className="overview-card">
        <div className='icon_wrap'><FontAwesomeIcon icon={faBoxOpen} className="overview-icon" /></div>
        <div className='data_wrap'><h3>Total Packages</h3>
        <p>78</p></div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
