'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarCheck, faBoxOpen, faGlobe, faFlag, faCity, faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Overview = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState('packages');
  const [data, setData] = useState(0);
  const [link, setLink] = useState('/admin/packages');
  const [icon, setIcon] = useState(faBoxOpen);
  const [title, setTitle] = useState('Total Packages');

  const fetchData = async (option) => {
    let url;
    switch (option) {
      case 'continents':
        url = '/api/v1/continents/get';
        break;
      case 'countries':
        url = '/api/v1/countries/get';
        break;
      case 'cities':
        url = '/api/v1/cities/get';
        break;
      case 'packages':
      default:
        url = '/api/v1/packages/get';
        break;
    }

    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result.totalResults || 0); // Set to 0 if totalResults is undefined or null
    } catch (error) {
      console.error('Error fetching data:', error);
      setData(0); // Set to 0 in case of an error
    }
  };

  useEffect(() => {
    fetchData(currentOption);
  }, [currentOption]);

  const handleOptionClick = (option) => {
    setData(0); // Reset data before fetching new data
    setCurrentOption(option);
    setPopupOpen(false);
    switch (option) {
      case 'continents':
        setLink('/admin/continents');
        setIcon(faGlobe);
        setTitle('Total Continents');
        break;
      case 'countries':
        setLink('/admin/countries');
        setIcon(faFlag);
        setTitle('Total Countries');
        break;
      case 'cities':
        setLink('/admin/cities');
        setIcon(faCity);
        setTitle('Total Cities');
        break;
      default:
        setLink('/admin/packages');
        setIcon(faBoxOpen);
        setTitle('Total Packages');
        break;
    }
  };

  return (
    <div className="overview">
      <h2>Dashboard Overview</h2>
      <div className="overview-cards">
        <div className="overview-card">
          <Link href="/admin/users">
            <div className="icon_wrap">
              <FontAwesomeIcon icon={faUsers} className="overview-icon" />
            </div>
            <div className="data_wrap">
              <h3>Total Users</h3>
              <p>1,234</p>
            </div>
          </Link>
        </div>
        <div className="overview-card">
          <Link href="/admin/bookings">
            <div className="icon_wrap">
              <FontAwesomeIcon icon={faCalendarCheck} className="overview-icon" />
            </div>
            <div className="data_wrap">
              <h3>Total Bookings</h3>
              <p>567</p>
            </div>
          </Link>
        </div>
        <div className="overview-card">
          <div className="toggle-btn" onClick={() => setPopupOpen(!popupOpen)}>
            <FontAwesomeIcon icon={faBars} className="menu-icon" />
          </div>
          <div className="card-content">
            <Link href={link}>
              <div className="icon_wrap">
                <FontAwesomeIcon icon={icon} className="overview-icon" />
              </div>
              <div className="data_wrap">
                <h3>{title}</h3>
                <p>{data}</p>
              </div>
            </Link>
          </div>
          {popupOpen && (
            <div className="popup">
              <ul>
                <li onClick={() => handleOptionClick('continents')}>Continents</li>
                <li onClick={() => handleOptionClick('countries')}>Countries</li>
                <li onClick={() => handleOptionClick('cities')}>Cities</li>
                <li onClick={() => handleOptionClick('packages')}>Packages</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;

