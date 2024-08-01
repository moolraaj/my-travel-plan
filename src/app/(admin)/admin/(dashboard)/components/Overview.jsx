// 'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarCheck, faBoxOpen, faGlobe, faFlag, faCity, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Overview = () => {
  const [data, setData] = useState({
    continents: 0,
    countries: 0,
    cities: 0,
    packages: 0,
    users: 0,
    bookings: 0,
  });

  const [loading, setLoading] = useState({
    continents: true,
    countries: true,
    cities: true,
    packages: true,
    users: true,
    bookings: true,
  });

  const fetchData = async (endpoint, key, isPackage = false) => {
    try {
      let result = [];
      let page = 1;
      const limit = 1000; // Adjust the limit according to your API
      while (true) {
        const response = await fetch(`${endpoint}?page=${page}&limit=${limit}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (isPackage) {
          result = result.concat(data.result);
          if (data.result.length < limit) break; // No more pages
        } else {
          setData(prevData => ({
            ...prevData,
            [key]: data.totalResults !== undefined ? data.totalResults : 0,
          }));
          break;
        }
        page += 1;
      }

      if (isPackage) {
        setData(prevData => ({
          ...prevData,
          [key]: result.length,
        }));
      }

      setLoading(prevLoading => ({
        ...prevLoading,
        [key]: false,
      }));
    } catch (error) {
      console.error(`Error fetching data for ${key}:`, error);
      setData(prevData => ({
        ...prevData,
        [key]: 0,
      }));
      setLoading(prevLoading => ({
        ...prevLoading,
        [key]: false,
      }));
    }
  };

  const fetchUsersAndBookings = async () => {
    try {
      // Fetching users
      const usersResponse = await fetch('/api/v1/sendquery/queries/get');
      if (!usersResponse.ok) {
        throw new Error(`HTTP error! status: ${usersResponse.status}`);
      }
      const usersData = await usersResponse.json();
      if (usersData.status === 200) {
        setData(prevData => ({
          ...prevData,
          users: usersData.result.length,
        }));
      } else {
        throw new Error(`Error fetching user data: ${usersData.message}`);
      }

      // Fetching bookings
      const bookingsResponse = await fetch('/api/v1/flight/queries/get');
      if (!bookingsResponse.ok) {
        throw new Error(`HTTP error! status: ${bookingsResponse.status}`);
      }
      const bookingsData = await bookingsResponse.json();
      setData(prevData => ({
        ...prevData,
        bookings: bookingsData.result.length,
      }));

      // Update loading states
      setLoading(prevLoading => ({
        ...prevLoading,
        users: false,
        bookings: false,
      }));
    } catch (error) {
      console.error('Error fetching users or bookings:', error);
      setData(prevData => ({
        ...prevData,
        users: 0,
        bookings: 0,
      }));
      setLoading(prevLoading => ({
        ...prevLoading,
        users: false,
        bookings: false,
      }));
    }
  };

  useEffect(() => {
    fetchData('/api/v1/continents/get', 'continents');
    fetchData('/api/v1/countries/get', 'countries');
    fetchData('/api/v1/cities/get', 'cities');
    fetchData('/api/v1/packages/get', 'packages', true);
    fetchUsersAndBookings();
  }, []);

  return (
    <div className="overview-d">
      <h2>Dashboard Overview</h2>
      <div className="overview-d-cards">
        <div className="overview-d-card">
          <Link href="/admin/users">
            <div className="icon_wrap">
              <FontAwesomeIcon icon={faUsers} className="overview-d-icon" />
            </div>
            <div className="data_wrap">
              <h3>Total Users</h3>
              <p>{loading.users ? <FontAwesomeIcon icon={faSpinner} spin /> : data.users}</p>
            </div>
          </Link>
        </div>
        <div className="overview-d-card">
          <Link href="/admin/bookings">
            <div className="icon_wrap">
              <FontAwesomeIcon icon={faCalendarCheck} className="overview-d-icon" />
            </div>
            <div className="data_wrap">
              <h3>Total Bookings</h3>
              <p>{loading.bookings ? <FontAwesomeIcon icon={faSpinner} spin /> : data.bookings}</p>
            </div>
          </Link>
        </div>
        <div className="overview-d-card">
          <Link href="/admin/continents">
            <div className="icon_wrap">
              <FontAwesomeIcon icon={faGlobe} className="overview-d-icon" />
            </div>
            <div className="data_wrap">
              <h3>Total Continents</h3>
              <p>{loading.continents ? <FontAwesomeIcon icon={faSpinner} spin /> : data.continents}</p>
            </div>
          </Link>
        </div>
        <div className="overview-d-card">
          <Link href="/admin/countries">
            <div className="icon_wrap">
              <FontAwesomeIcon icon={faFlag} className="overview-d-icon" />
            </div>
            <div className="data_wrap">
              <h3>Total Countries</h3>
              <p>{loading.countries ? <FontAwesomeIcon icon={faSpinner} spin /> : data.countries}</p>
            </div>
          </Link>
        </div>
        <div className="overview-d-card">
          <Link href="/admin/cities">
            <div className="icon_wrap">
              <FontAwesomeIcon icon={faCity} className="overview-d-icon" />
            </div>
            <div className="data_wrap">
              <h3>Total Cities</h3>
              <p>{loading.cities ? <FontAwesomeIcon icon={faSpinner} spin /> : data.cities}</p>
            </div>
          </Link>
        </div>
        <div className="overview-d-card">
          <Link href="/admin/packages">
            <div className="icon_wrap">
              <FontAwesomeIcon icon={faBoxOpen} className="overview-d-icon" />
            </div>
            <div className="data_wrap">
              <h3>Total Packages</h3>
              <p>{loading.packages ? <FontAwesomeIcon icon={faSpinner} spin /> : data.packages}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;


