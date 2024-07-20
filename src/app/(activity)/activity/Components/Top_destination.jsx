import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import styles from './TopDestinations.module.css';

const destinations = [
  {
    city: 'Warsaw',
    imgSrc: '/images/europe_img_1.png',
  },
  {
    city: 'Oslo',
    imgSrc: '/images/europe_img_1.png',
  },
  {
    city: 'Bergen',
    imgSrc: '/images/europe_img_1.png',
  },
  {
    city: 'Bergen',
    imgSrc: '/images/europe_img_1.png',
  },
  {
    city: 'Stockholm',
    imgSrc: '/images/europe_img_1.png',
  },
];

const TopDestinations = () => {
  return (
    <div className="top-dest-container">
    <div className="inner-w-container">
      <h2 className="top-dest-title">Top Destination By Our Travel Experts</h2>
      <p className="top-dest-subtitle">Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
      <div className="top-dest-gridContainer">
        {destinations.map((destination, index) => (
          <Link className="top-dest-cardOuter" href={`/${destination.city.toLowerCase().replace(' ', '-')}`} key={index}>
            <div className="top-dest-card">
              <Image
                src={destination.imgSrc}
                alt={destination.city}
                width={1000}
                height={300}
                className="top-dest-image"
              />
              <div className="top-dest-Details">
                <h3 className="top-dest-city">{destination.city}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>   
    </div>   
  );
};

export default TopDestinations;
