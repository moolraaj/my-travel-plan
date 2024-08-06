import React from 'react';

export default function Topbanner({slug}) {
  return (
    <div
      className='top_banner_destination'
      style={{
        backgroundImage: `url('/images/destinationfullbanner.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px', 
      }}
    >
      <div className='heading_two'>
        <h2>Explore All <span>International Destinations</span></h2>
        <span className='hamburger'>{slug} / Destination</span>               
      </div>
    </div>
  );
}




