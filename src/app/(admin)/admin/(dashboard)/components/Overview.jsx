'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarCheck, faBoxOpen, faGlobe, faFlag, faCity } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Overview = () => {
  const [data, setData] = useState({
    continents: 0,
    countries: 0,
    cities: 0,
    packages: 0,
  });

  const fetchData = async (endpoint, key, isPackage = false) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(`API Response for ${key}:`, result); // Log the API response for debugging
      setData(prevData => ({
        ...prevData,
        [key]: isPackage ? result.result.length : result.totalResults !== undefined ? result.totalResults : 0,
      }));
    } catch (error) {
      console.error(`Error fetching data for ${key}:`, error);
      setData(prevData => ({
        ...prevData,
        [key]: 0,
      }));
    }
  };

  useEffect(() => {
    fetchData('/api/v1/continents/get', 'continents');
    fetchData('/api/v1/countries/get', 'countries');
    fetchData('/api/v1/cities/get', 'cities');
    fetchData('/api/v1/packages/get', 'packages', true);
  }, []);

  return (
    <div className="overview">
    <div></div>
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
          <Link href="/admin/continents">
            <div className="icon_wrap">
              <FontAwesomeIcon icon={faGlobe} className="overview-icon" />
            </div>
            <div className="data_wrap">
              <h3>Total Continents</h3>
              <p>{data.continents}</p>
            </div>
          </Link>
        </div>
        <div className="overview-card">
          <Link href="/admin/countries">
            <div className="icon_wrap">
              <FontAwesomeIcon icon={faFlag} className="overview-icon" />
            </div>
            <div className="data_wrap">
              <h3>Total Countries</h3>
              <p>{data.countries}</p>
            </div>
          </Link>
        </div>
        <div className="overview-card">
          <Link href="/admin/cities">
            <div className="icon_wrap">
              <FontAwesomeIcon icon={faCity} className="overview-icon" />
            </div>
            <div className="data_wrap">
              <h3>Total Cities</h3>
              <p>{data.cities}</p>
            </div>
          </Link>
        </div>
        <div className="overview-card">
          <Link href="/admin/packages">
            <div className="icon_wrap">
              <FontAwesomeIcon icon={faBoxOpen} className="overview-icon" />
            </div>
            <div className="data_wrap">
              <h3>Total Packages</h3>
              <p>{data.packages}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;
