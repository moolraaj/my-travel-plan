'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import trending from '../app/assets/home_images/trending.png';
import ribbon from '../app/assets/home_images/ribbon.png';
import fishbg from '../app/assets/home_images/fish-bg.png';
import emptyImage from '../app/assets/empty.jpg';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';

function Destinations() {
  let api = EXPORT_ALL_APIS();
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);

  const fetchAllCountries = async () => {
    try {
      let resp = await api.loadAllCountries();
      setData(resp.result || []);
    } catch (error) {
      console.error('Failed to load countries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  let reversedCountries = Array.isArray(data) ? [...data].reverse() : [];

  return (
    <div className='top-destination' style={{ backgroundImage: `url(${fishbg.src})` }}>
      <div className="topdestination container inner-w-container">
        <h2 className='same_heading'>Top Destination By Our Travel Experts</h2>
        <p>Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
        <div className="destinations expert-travel">
          {reversedCountries===null||reversedCountries===undefined?('no result found'):(reversedCountries.slice(0,8).map((country, index) => (
            <Link className="destination" href={`/${country.slug.toLowerCase().replace(' ', '-')}`}>

            <div key={index} >
             
              {country.images === null || country.images === undefined ? ('no result found') : country.images.map((e) => {
                return <Image
                  key={e._id}
                  src={`/uploads/${e.name}`}
                  alt={country.name}
                  width={1000}
                  height={300}
                  className="image-travel-expert"
                />
              })}

              <span
                style={{
                  backgroundImage: `url(${ribbon.src})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
                className="trending"
              >
                <img src={trending.src}></img>
                TREADING
              </span>
              <div className="info">
                <h3>{country.title}</h3>
                <p>{country.countries} Packages</p>

              </div>
            </div>
            </Link>
          )))}
        </div>
      </div>
    </div>
  );
}

function EmptyDestinationComponent() {
  return (
    <>
      {Array(8).fill().map((_, index) => (
        <Link href="#" className="destination" key={index}>
          <div className="destination">
            <Image
              src={emptyImage.src}
              alt="Loading"
              width={1000}
              height={300}
              className="image-travel-expert"
              style={{ width: '100%', height: '100%' }}
            />
            <span
              style={{
                backgroundImage: `url(${ribbon.src})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
              className="trending"
            >
              loading...
            </span>
            <div className="info">
              <h3>loading...</h3>
              <p>loading...</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default Destinations;
