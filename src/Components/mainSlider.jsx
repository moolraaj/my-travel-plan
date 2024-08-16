'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import heroimage from '../app/assets/home_images/heroimage.png';
import herosliderthree from '../app/assets/home_images/hero-sliderthree.png';
import europeone from "../../public/images/europeone.jpg";
import europetwo from "../../public/images/europeteo.jpg";
import europethree from '../../public/images/europethree.jpg';
import europefour from '../../public/images/europefour.jpg';

import explore from '../app/assets/home_images/explore.png';
import desti from '../app/assets/home_images/search-destination.png';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: europeone, alt: 'Hero Image' },
    { src: europetwo, alt: 'Hero Image' },
    { src: europethree, alt: 'Hero Image' },
    { src: europefour, alt: 'Hero Image' },
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
      <Image className='slider-images'
        src={images[currentIndex].src}
        alt={images[currentIndex].alt || "loading..."}
        priority
        width={1920}
        height={999}
        objectFit='cover'
      />
      <div className="content">
        <h1 className="title">We Fell Travel</h1>
        <div className="searchContainer">
          <div className='search-desti'>
            <img src={desti.src} alt="Destination Icon" className="desti-icon" />
            <input
              type="text"
              placeholder="You Are Searching For"
              className="searchInput"
            />
          </div>

          <button className="searchButton">
            <img src={explore.src} />Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
