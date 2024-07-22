import React from 'react';
import Image from 'next/image';
import Image1 from '../../src/app/assets/home_images/contone.png';
import Image2 from '../../src/app/assets/home_images/conttwo.png';
import Image3 from '../../src/app/assets/home_images/contthree.png';
import Image4 from '../../src/app/assets/home_images/contfour.png';
import Image5 from '../../src/app/assets/home_images/contfive.png';
import Image6 from '../../src/app/assets/home_images/contsix.png';

const destinations = [
  { name: 'Greece', price: 'From ₹ 37,500', imageUrl: Image1 },
  { name: 'Hungary', price: 'From ₹ 35,500', imageUrl: Image2 },
  { name: 'Iceland', price: 'From ₹ 39,550', imageUrl: Image3 },
  { name: 'Italy', price: 'From ₹ 30,550', imageUrl: Image4 },
  { name: 'Luxembourg', price: 'From ₹ 25,440', imageUrl: Image5 },
  { name: 'Netherlands', price: 'From ₹ 15,440', imageUrl: Image6 }
];

const ExplorationsFarAway = () => {
  return (
    <div className="explorations-container">
      <h2>Explorations Far Away</h2>
      <p>Ideal for 5-14 days trip</p>
      <div className="destinations-grid">
        {destinations.map((destination, index) => (
          <div key={index} className="destination-card">
            <Image 
              src={destination.imageUrl} 
              alt={destination.name} 
              className="destination-image" 
            />
            <div className="destination-info">
              <h3>{destination.name}</h3>
              <p>{destination.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExplorationsFarAway;
