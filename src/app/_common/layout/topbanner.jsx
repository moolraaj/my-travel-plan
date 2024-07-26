import React from 'react';

export default function Topbanner() {
  return (
    <div
      className='top_banner_destination'
      style={{
        backgroundImage: `url('/images/destinationfullbanner.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px', // Adjust the height as needed
      }}
    >
      <div className='heading_two'>
        <h2>Explore All <span>International Destinations</span></h2>
        <span className='hamburger'>Home / Destination</span>               
      </div>
    </div>
  );
}




