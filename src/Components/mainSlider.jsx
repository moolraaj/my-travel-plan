import { useState, useEffect } from 'react';
import heroimage from '../app/assets/home_images/cont1.png';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    heroimage,
    // Add more images if needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="slider"
      style={{ backgroundImage:`url(${images[currentIndex]})` }}
    >
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
  );
};

export default Slider;
