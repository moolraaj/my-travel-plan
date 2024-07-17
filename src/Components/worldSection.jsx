import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import './css.scss';

const countriesData = [
  { name: 'Europe', countries: 7, imgSrc: '/path/to/europe.jpg' },
  { name: 'North America', countries: 2, imgSrc: '/path/to/north-america.jpg' },
  { name: 'Australia', countries: 6, imgSrc: '/path/to/australia.jpg' },
  { name: 'Asia', countries: 4, imgSrc: '/path/to/asia.jpg' },
  { name: 'South America', countries: 8, imgSrc: '/path/to/south-america.jpg' },
];

const World_section = () => {
  return (
    <div className="grid-container">
      {countriesData.map((country, index) => (
        <Link href={`/${country.name.toLowerCase().replace(' ', '-')}`} key={index}>
          <div className="card">
            <div className="overlay">
              <div className="label">{country.countries}-Countries</div>
            </div>
            <Image 
              src={country.imgSrc}
              alt={country.name}
              width={300}
              height={200}
              className="image"
            />
            <div className="text">{country.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default World_section;
