'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import triangle from '../app/assets/home_images/triangle.png';
import camerabg from '../app/assets/home_images/camera-bg.png';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import emptyImage from '../app/assets/empty.jpg';

function WorldSection() {
  let api = EXPORT_ALL_APIS();

  let [result, setResult] = useState([]);
  let [loading, setLoading] = useState(true);

  const fetchAllContinents = async () => {
    try {
      let resp = await api.loadAllContinents();
      setResult(resp.result || []);
    } catch (error) {
      console.error('Failed to load continents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContinents();
  }, []);

  let reversedContinents = [...result].reverse();

  return (
    <div className='world-country' style={{ backgroundImage: `url(${camerabg.src})` }}>
      <div className="grid-container">
        {loading || reversedContinents.length === 0 ? (
          <EmptyComponent />
        ) : (
          reversedContinents.slice(0, 5).map((country, index) => (
            <Link className="card_outer" href={`/${country.slug.toLowerCase().replace(' ', '-')}`} key={index}>
              <div className="card">
                <div className="overlay">
                  <div className="label">{country.total_countries} Countries <Image src={triangle} alt="Triangle" style={{width: 'auto', height: 'auto'}}/></div>
                </div>
                {country.images && country.images.length > 0 ? (
                  <Image
                    src={`/uploads/${country.images[0].name}`}
                    alt={country.name || "loading..."}
                    style={{ width: '100%', height: '100%' }}
                    width={1000}
                    height={300}
                    className="image"
                  />
                ) : (
                  <div className="no-image">No Image Available</div>
                )}
                <div className="text">{country.title}</div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

function EmptyComponent() {
  return (
    <>
      {Array(5).fill().map((_, index) => (
        <Link className="card_outer" href="#" key={index}>
          <div className="card">
            <div className="overlay">
              <div className="label">Loading... <Image src={triangle} alt="Triangle"  style={{width: 'auto', height: 'auto'}}/></div>
            </div>
            <Image
              src={emptyImage.src}
              alt="Loading"
              style={{ width: '100%', height: '100%' }}
              width={1000}
              height={300}
              className="image"
            />
            <div className="text">Loading...</div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default WorldSection;
