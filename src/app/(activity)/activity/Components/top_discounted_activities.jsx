import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import discountactivitybg from '../../../assets/home_images/discount-activity-bg.png';

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

const TopDiscountedActivities = ({result}) => {
  let reversedActivities=Array.isArray(result)?[...result].reverse():[]
  return (
    <div className="top-discounted-container" style={{ backgroundImage: `url(${discountactivitybg.src})`}} >
    <div className="inner-w-container">
      <h2 className="top-discounted-title">Top Discounted Activities</h2>
      <p className="top-discounted-subtitle">Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
      <div className="top-discounted-gridContainer">
        {reversedActivities===undefined||reversedActivities===null?('no result found'):(reversedActivities.map((activity, index) => (
          <Link className="top-discounted-cardOuter" href={`/${activity.slug.toLowerCase().replace(' ', '-')}`} key={index}>
            <div className="top-discounted-card">
              <div className="top-discounted-overlay">
                <span className="top-discounted-label">{activity.discount} % </span>
              </div>
              
                {activity.images ? activity.images.map((e) => (
                      <Image
                        key={e._id}
                        src={`/uploads/${e.name}`}
                        alt={e.title}
                        width={1000}
                height={300}
                className="top-discounted-image"
                      />
                    )) : 'No image found'}
              <div className="top-discounted-Details">
                <h3 className="top-discounted-country">{activity.title}</h3>
                <p className="top-discounted-description">{activity.description}</p>
              </div>
            </div>
          </Link>
        )))}
      </div>
    </div>
    </div>
  );
};

export default TopDiscountedActivities;
