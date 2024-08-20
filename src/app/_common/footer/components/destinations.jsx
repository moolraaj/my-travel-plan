// components/Destinations.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import Link from 'next/link';

const Destinations = () => {
  const [countrylinks, setCountrylinks] = useState([]);

  const fetchCountryLinks = async () => {
    const api = EXPORT_ALL_APIS();
    const data = await api.loadAllCountries();
    setCountrylinks(data.result);
  };

  useEffect(() => {
    fetchCountryLinks();
  }, []);

  // Check if countrylinks is not null before reversing
  const reveredCountry = countrylinks ? [...countrylinks].reverse() : [];

  return (
    <div className="destinations-container">
      <h3 className="destinations-title">Destinations</h3>
      <ul className="destinations-list">
        {reveredCountry.slice(0,7).map((destination, index) => (
          <li key={index} className="destinations-item">
            <Link href={`/country/${destination.slug}`}>
              {destination.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Destinations;
