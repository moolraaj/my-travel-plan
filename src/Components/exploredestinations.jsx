'use client'
import Image from 'next/image';

const ExploreDestinations = () => {
  const destinations = [
    { label: 'Adventure Holiday', imgSrc: '/images/adventure.png' },
    { label: 'Domestic Holiday', imgSrc: '/images/domestic.png' },
    { label: 'International Holiday', imgSrc: '/images/international.png' },
    { label: 'Hill Station Holiday', imgSrc: '/images/hill_station.png' },
    { label: 'Beach Holiday', imgSrc: '/images/beach.png' },
    { label: 'Pilgrim Holidays', imgSrc: '/images/pilgrim.png' },
  ];

  return (
    <div className="explore-destinations">
      <h2 className='same_heading'>Explore Destinations By Theme</h2>
      <p>Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
      <div className="destinations-container-countries">
        {destinations.map((destination, index) => (
          <div key={index} className="destination">
            <Image
              src={destination.imgSrc}
              alt={destination.label}
              width={100}
              height={100}
              className="destination-image"
            />
            <p>{destination.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreDestinations;
