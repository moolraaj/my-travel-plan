'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarCheck, faBoxOpen, faGlobe, faFlag, faCity, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Overview = () => {
  const [data, setData] = useState({
    users: 0,
    bookings: 0,
    continents: 0,
    countries: 0,
    cities: 0,
    packages: 0,
  });

  const [loading, setLoading] = useState({
    continents: true,
    countries: true,
    cities: true,
    packages: true,
    users: true,
    bookings: true
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

  useEffect(() => {
    fetchData('/api/v1/continents/get', 'continents', false);
    fetchData('/api/v1/countries/get', 'countries', false);
    fetchData('/api/v1/cities/get', 'cities', false);
    fetchData('/api/v1/packages/get', 'packages', true);
    fetchData('/api/v1/sendquery/queries/get', 'users', false);
    fetchData('/api/v1/flight/queries/get', 'bookings', false);
  }, []);

  return (
    <div className="overview-d">
      <h2>Dashboard Overview</h2>
      <div className="overview-d-cards">
        {Object.keys(data).map((key) => (
          <div className="overview-d-card" key={key}>
            <Link href={`/admin/${key}`}>
              <div className="icon_wrap">
                <FontAwesomeIcon icon={iconMap[key]} className="overview-d-icon" />
              </div>
              <div className="data_wrap">
                <h3>Total {capitalizeFirstLetter(key)}</h3>
                <p>{loading[key] ? <FontAwesomeIcon icon={faSpinner} spin /> : data[key]}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper functions
const iconMap = {
  users: faUsers,
  bookings: faCalendarCheck,
  continents: faGlobe,
  countries: faFlag,
  cities: faCity,
  packages: faBoxOpen
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default Overview;
