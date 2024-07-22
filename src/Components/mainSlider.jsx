'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import heroimage from '../app/assets/home_images/heroimage.png';
import heroimageone from '../app/assets/home_images/slidertwo.png';


const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: heroimage, alt: 'Hero Image' },
    { src: heroimageone, alt: 'Hero Image' },
    // Add more images if needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider">
      <Image
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        layout="fill"
        objectFit="cover"
      />
      <div className="content">
        <h1 className="title">We Fell Travel</h1>
        <div className="searchContainer">
          <input
            type="text"
            placeholder="You Are Searching For"
            className="searchInput"
          />
          <button className="searchButton">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
