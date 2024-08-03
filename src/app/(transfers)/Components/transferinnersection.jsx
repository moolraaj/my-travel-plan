// components/CarOptions.js
import React from 'react';

const CarOptions = () => {
  const carData = [
    {
      title: "4 Seater Car",
      imageUrl: '/images/car-1.png' ,
      rating: 4.0,
      reviews: "1.3K",
      price: "39,550",
    },
    {
      title: "7 Seater Van",
      imageUrl: '/images/car-2.png' ,
      rating: 4.0,
      reviews: "1.3K",
      price: "4,550",
    },
    {
      title: "34 Seater Car",
      imageUrl: '/images/car-3.png' ,
      rating: 4.0,
      reviews: "1.3K",
      price: "5,000",
    },
    {
      title: "5 Maruti Car",
      imageUrl: '/images/car-4.png' ,
      rating: 4.0,
      reviews: "1.3K",
      price: "4,550",
    },
  ];

  return (
    <div className="transfer-vehicle-section">
      {carData.map((car, index) => (
        <div key={index} className="car-box">
          <img src={car.imageUrl} alt={car.title} className="carimage" />
          
            <div className='text-container'>
                <h3 className="cartitle">{car.title}</h3>
                <div className='rating-price'>
                    <span className="carstars">⭐</span> {car.rating} ({car.reviews} Reviews)
                    <div className="carprice">From ₹ {car.price}</div>
                </div>          
            </div>
          
        </div>
      ))}
    </div>
 
    
  );
};

export default CarOptions;
