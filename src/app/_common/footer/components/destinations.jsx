// components/Destinations.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import Link from 'next/link';

const Destinations = () => {
  const [countryLinks, setCountryLinks] = useState([]);

  const fetchCountryLinks = async () => {
    try {
      const api = EXPORT_ALL_APIS();
      const data = await api.loadAllCountries();
      setCountryLinks(data.result || []);
    } catch (error) {
      console.error('Error fetching country links:', error);
      setCountryLinks([]);
    }
  };

  useEffect(() => {
    fetchCountryLinks();
  }, []);

  // Reverse the country list safely
  const reversedCountryLinks = countryLinks.length > 0 ? [...countryLinks].reverse() : [];

  return (
    <div className="destinations-container">
      <h3 className="destinations-title">Destinations</h3>
      <ul className="destinations-list">
        {reversedCountryLinks.length > 0 ? (
          reversedCountryLinks.slice(0, 7).map((destination, index) => (
            <li key={index} className="destinations-item">
              <Link href={`/country/${destination.slug}`}>
                {destination.title}
              </Link>
            </li>
          ))
        ) : (
          <li></li>
        )}
      </ul>
    </div>
  );
};

export default Destinations;
