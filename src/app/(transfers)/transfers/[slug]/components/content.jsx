import React from 'react';
import Link from 'next/link';

const TransferContent = () => {
  const carData = [
    {
      title: "Price Start From",
      name: "Maruti Suzuki Swift",
      imageUrl: '/images/innercar-2.png',
      price: "40,000",
    },
    {
        title: "Price Start From",
        name: "Maruti Suzuki Brezza",
        imageUrl: '/images/innercar-3.png',
        price: "40,000",
      },
      {
        title: "Price Start From",
        name: "Maruti Suzuki Swift",
        imageUrl: '/images/innercar-1.png',
        price: "40,000",
      },
      {
        title: "Price Start From",
        name: "Maruti Suzuki Swift",
        imageUrl: '/images/innercar-1.png',
        price: "40,000",
      },
      {
        title: "Price Start From",
        name: "Maruti Suzuki Ertiga",
        imageUrl: '/images/innercar-3.png',
        price: "40,000",
      },
      {
        title: "Price Start From",
        name: "Maruti Suzuki Swift",
        imageUrl: '/images/innercar-2.png',
        price: "40,000",
      },

  ];

  return (
    <div className="transfer-info">
      <div className="over">
        <h2 className="heading_inner_page">Overview</h2>
        <p>
          Mesmerizing 4-night 5-day journey with our Passionate Paris With Disney tour seamlessly blending the romance of Parisian streets with the enchantment of Disneyland Paris. Begin your adventure immersing in Paris is iconic landmarks like the Eiffel Tower and Notre-Dame Cathedral followed by leisurely explorations of charming neighborhoods and
        </p>
      </div>
      <div className="transfer-details">

          <h2> Transfer Details</h2>
          <div className="transferinner-vehicle-section">
                {carData.map((car, index) => (
                <div key={index} className="car-inner-box">
                    <img src={car.imageUrl} alt={car.title} className="car-image" />
                    <div className="car-text-container">
                        <div className='txtleft'>
                            <h3>{car.title}</h3>
                            <div className="car-price"> ₹ {car.price}</div>
                        </div>
                        <div className='txtright'>
                            <h3>{car.name}</h3>
                        </div>
                        
                    </div>
                    <button className="transfer-inner-butn "><a href='/contact-us'>Book Now </a></button>
                </div>
                ))}
            </div>

        
        </div>
    </div>
  );
};

export default TransferContent;
