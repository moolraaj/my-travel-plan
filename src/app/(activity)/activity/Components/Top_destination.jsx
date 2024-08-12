import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import styles from './TopDestinations.module.css';



const TopDestinations = ({response}) => {

  let reversedCities=Array.isArray(response)?[...response].reverse():[]
  return (
    <div className="top-dest-container">
    <div className="inner-w-container">
      <h2 className="top-dest-title">Top Destination By Our Travel Experts</h2>
      <p className="top-dest-subtitle">Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
      <div className="top-dest-gridContainer">
        {reversedCities===null||reversedCities===undefined?('no result found'):(reversedCities.map((destination, index) => (
          <Link className="top-dest-cardOuter" href={`/${destination.slug.toLowerCase().replace(' ', '-')}`} key={index}>
            <div className="top-dest-card">
            
                {destination.images ? destination.images.map((e) => (
                      <Image
                        key={e._id}
                        src={`/uploads/${e.name}`}
                        alt={e.title}
                        width={1000}
                        height={300}
                        className="top-dest-image"
                      />
                    )) : 'No image found'}
              <div className="top-dest-Details">
                <h3 className="top-dest-city">{destination.title||'no title found'}</h3>
              </div>
            </div>
          </Link>
        )))}
      </div>
    </div>   
    </div>   
  );
};

export default TopDestinations;
