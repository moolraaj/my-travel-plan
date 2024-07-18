// components/Destinations.js
import React from 'react';

const destinations = [
  'Austria',
  'Belgium',
  'France',
  'Germany',
  'Iceland',
  'Italy',
  'Netherlands'
];

const Destinations = () => {
  return (
    <div className="destinations-container">
      <h3 className="destinations-title">Destinations</h3>
      <ul className="destinations-list">
        {destinations.map((destination, index) => (
          <li key={index} className="destinations-item">{destination}</li>
        ))}
      </ul>
    </div>
  );
};

export default Destinations;
