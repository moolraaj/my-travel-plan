import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import activitytop from '../../../assets/home_images/activity-top.png';
// import styles from './TopActivities.module.css';

 

const TopActivities = ({ result }) => {
  let reversedActivities=Array.isArray(result)?[...result].reverse():[]
  return (
    <div className="top-act-container" style={{ backgroundImage: `url(${activitytop.src})` }} >
      <div className="inner-w-container">
        <h2 className="top-act-title">Top Activities</h2>
        <p className="top-act-subtitle">Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
        <div className="top-act-gridContainer">
          {reversedActivities === undefined || reversedActivities === null ? ('no result found') : (reversedActivities.slice(0,8).map((activity, index) => (
            <Link className="top-act-cardOuter" href={`/activity/${activity.slug.toLowerCase().replace(' ', '-')}`} key={index}>
              <div className="top-act-card">
                <div className='image-container-act'>
               
                   {activity.images ? activity.images.map((e) => (
                      <Image
                        key={e._id}
                        src={`/uploads/${e.name}`}
                        alt={e.title}
                        width={1000}
                        height={1000}
                        className="top-act-image"
                      />
                    )) : 'No image found'}
                  <div className="top-act-duration">{activity.duration}</div>

                </div>
                <div className="top-act-Details"
                  style={{
                    backgroundImage: `url('/images/bacrounded.png')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}>

                  <div className='top-act-icon'>
                    {activity.icon ? activity.icon.map((e) => (
                      <Image
                        key={e._id}
                        src={`/uploads/${e.name}`}
                        alt={e.title}
                        width={30}
                        height={30}
                        className='card-icon'
                      />
                    )) : 'No image found'}

                  </div>
                  <h3 className="top-act-country">{activity.title}</h3>
                  <p className="top-act-description">{activity.description}</p>
                </div>
              </div>
            </Link>
          )))}
        </div>
      </div>
    </div>
  );
};

export default TopActivities;
