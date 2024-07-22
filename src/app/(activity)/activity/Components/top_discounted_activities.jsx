import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const discountedActivities = [
  {
    country: 'Italy',
    description: 'Italy City Tour With Ferry and Cable Car',
    discount: '10% Off',
    imgSrc: '/images/europe_img_1.png',
  },
  {
    country: 'Luxembourg',
    description: 'Luxembourg City Tour With Ferry and Cable Car',
    discount: '15% Off',
    imgSrc: '/images/europe_img_1.png',
  },
  {
    country: 'Portugal',
    description: 'Portugal City Tour With Ferry and Cable Car',
    discount: '5% Off',
    imgSrc: '/images/europe_img_1.png',
  },
  {
    country: 'Slovakia',
    description: 'Slovakia City Tour With Ferry and Cable Car',
    discount: '20% Off',
    imgSrc: '/images/europe_img_1.png',
  },
  {
    country: 'Spain',
    description: 'Spain City Tour With Ferry and Cable Car',
    discount: '25% Off',
    imgSrc: '/images/europe_img_1.png',
  },
];

const TopDiscountedActivities = () => {
  return (
    <div className="top-discounted-container">
    <div className="inner-w-container">
      <h2 className="top-discounted-title">Top Discounted Activities</h2>
      <p className="top-discounted-subtitle">Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
      <div className="top-discounted-gridContainer">
        {discountedActivities.map((activity, index) => (
          <Link className="top-discounted-cardOuter" href={`/${activity.country.toLowerCase().replace(' ', '-')}`} key={index}>
            <div className="top-discounted-card">
              <div className="top-discounted-overlay">
                <span className="top-discounted-label">{activity.discount}</span>
              </div>
              <Image
                src={activity.imgSrc}
                alt={activity.country}
                width={1000}
                height={300}
                className="top-discounted-image"
              />
              <div className="top-discounted-Details">
                <h3 className="top-discounted-country">{activity.country}</h3>
                <p className="top-discounted-description">{activity.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default TopDiscountedActivities;
