import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import styles from './TopActivities.module.css';

const activities = [
  {
    country: 'Austria',
    description: 'Zurich City Tour With Ferry and Cable Car',
    duration: '4 hrs',
    imgSrc: '/images/Destination1.png',
    iconSrc: '/images/Vector.png',
  },
  {
    country: 'Belgium',
    description: 'Parachute Jumping in Spa',
    duration: '6 hrs',
    imgSrc: '/images/Destination1.png',
    iconSrc: '/images/Vector.png',
  },
  {
    country: 'Germany',
    description: 'Glacier Hiking and Ice Climbing',
    duration: '8 hrs',
    imgSrc: '/images/Destination1.png',
    iconSrc: '/images/Vector.png',
  },
  {
    country: 'Greece',
    description: 'Greek Adventure Rafting Base',
    duration: '5 hrs',
    imgSrc: '/images/Destination1.png',
    iconSrc: '/images/Vector.png',
  },
];

const TopActivities = () => {
  return (
    <div className="top-act-container">
    <div className="inner-w-container">
      <h2 className="top-act-title">Top Activities</h2>
      <p className="top-act-subtitle">Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
      <div className="top-act-gridContainer">
        {activities.map((activity, index) => (
          <Link className="top-act-cardOuter" href={`/activity/${activity.country.toLowerCase().replace(' ', '-')}`} key={index}>
            <div className="top-act-card">
            <div className='image-container-act'>
              <Image
                src={activity.imgSrc}
                alt={activity.country}
                width={1000}
                height={1000}
                className="top-act-image"
              />
                              <div className="top-act-duration">{activity.duration}</div>

              </div>
              <div className="top-act-Details"
     style={{
       backgroundImage: `url('/images/bacrounded.png')`,
       backgroundSize: 'cover',
       backgroundRepeat: 'no-repeat'
     }}>

                <div className='top-act-icon'>
                <Image
                  src={activity.iconSrc}
                  alt={activity.iconSrc}
                  width={30}
                  height={30}
                  className='card-icon'
                />

                </div>
                <h3 className="top-act-country">{activity.country}</h3>
                <p className="top-act-description">{activity.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default TopActivities;
