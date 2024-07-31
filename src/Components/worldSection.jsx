import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import triangle from '../app/assets/home_images/triangle.png';
import europe from '../app/assets/home_images/europe.png';
import camerabg from '../app/assets/home_images/camera-bg.png';
// import './css.scss';

const countriesData = [
  // G:\Node js Projects\my-travel-plan\src\app\assets\home_images\europe.png
  { name: 'Europe', countries: 7, imgSrc: '/images/europe_img_1.png'  },
  { name: 'North America', countries: 2, imgSrc: '/images/europe.png' },
  { name: 'Australia', countries: 6, imgSrc: '/images/australia.png' },
  { name: 'Asia', countries: 4, imgSrc: '/images/asia.png' },
  { name: 'South America', countries: 8, imgSrc: '/images/southamerica.png' },
];


const World_section = () => {
  return (  
    <div className='world-country' style={{ backgroundImage: `url(${camerabg.src})`}} >
    <div className="grid-container">
      {countriesData.map((country, index) => (
        <Link className="card_outer" href={`/${country.name.toLowerCase().replace(' ', '-')}`} key={index}>
          <div className="card">
            <div className="overlay">
              <div className="label">{country.countries}-Countries <img src={triangle.src}/> </div>
            </div>

            <Image
              src={country.imgSrc}
              alt={country.name}
              style={{width:'100%', height:'100%'}}
              width={1000}
              height={300}
              className="image"
            />

            <div className="text">{country.name}</div>
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default World_section;
