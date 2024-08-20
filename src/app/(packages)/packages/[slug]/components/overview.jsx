import React, { useState } from 'react';
import Inclusions from './inclusions';

const Itinerary = ({ result }) => {

  console.log(`result`)
  console.log(result)
  const [openDay, setOpenDay] = useState(null);
  const [activeTab, setActiveTab] = useState('inclusions');


  const toggleDay = (day) => {
    setOpenDay(openDay === day ? null : day);
  };



  const galleryImages = [
    '/images/gallerya.png',
    '/images/galleryc.png',
    '/images/gallerb.png',
    '/images/galleryf.png',
    '/images/galleryd.png',
    '/images/galleryf.png',
  ];




  const hotelActivitiesContent = (
    <div>
      <h3>Hotel Activities</h3>
      <ul>
        <li>Activity 1</li>
        <li>Activity 2</li>
        <li>Activity 3</li>
      </ul>
    </div>
  );

  return (

    <>
      {result === undefined || result === null ? ('no result found') : (result.map((ele) => {
        return <div className='overview' key={ele._id}>

          <div className='over'>
            <h2 className='heading_inner_page'>Overview</h2>
            <p>{ele.packageOverview || null}</p>
          </div>


          <div className='summary_slider'>
            <div className="itinerary_inner">
              <div className='itenary_contact'>
                <div className='top_summary'>
                  <div className='top_summary_inner'>
                    <h2 className='heading_inner_page'>Top Summary</h2>
                    <p>{ele.packageTopSummary}

                    </p>
                  </div>
                </div>

                <div className='iten_inner'>
                  <h2 className='heading_inner_page'>Itinerary</h2>
                  <div className='day_content'>
                    {ele.packageItinerary === null || ele.packageItinerary === undefined ? ('no result found') : (ele.packageItinerary.map((item) => (
                      <div key={item._id} className="day">
                        <div className="dayHeader" onClick={() => toggleDay(item.day)}>

                          <span>Day {item.day}: {item.location}</span>
                          <span>{openDay === item.day ? '↑' : '↓'}</span>
                        </div>
                        {openDay === item.day && (
                          <div className="dayContent">
                            <p>{item.itinerary_description}</p>
                          </div>
                        )}
                      </div>
                    )))}
                  </div>
                </div>

                <div className="tabs_inclusion">
                  <button
                    className={activeTab === 'inclusions' ? 'active' : ''}
                    onClick={() => setActiveTab('inclusions')}
                  >
                    Inclusions & Exclusions
                  </button>
                  <button
                    className={activeTab === 'activities' ? 'active' : ''}
                    onClick={() => setActiveTab('activities')}
                  >
                    Hotel Activities
                  </button>
                </div>
                <div className="tabContent">
                  {activeTab === 'inclusions' ? <Inclusions packagesExclude
                    ={ele.packagesExclude
                    } packagesInclude={ele.packagesInclude} /> : 'no result found'}
                </div>
                <button className=" book-now-btn"><a href='/contact-us'>Book Now </a></button>
              </div>
              
              <div className='right_query'>
                <div className='card_contact'>
                  <span>Package Code: 128391823</span>
                  <div className='question'>
                    <h1>Have a Question?</h1>
                    <p>Do not hesitage to give us a call. We are an expert team and we are happy to talk to you</p>
                    <div className='contact_card'>
                      <a href='tel:+91 8627814386'>+91 8627814386</a>
                      <a href='mailto:booking@streetromeo.com'>booking@streetromeo.com</a>
                    </div>
                  </div>
                </div>
                {ele.packages_galleries === null || ele.packages_galleries.length === 0 ? (
                  ''
                ) : (
                  <div className='gallery_inner_page'>
                    <div className="sidebar-gallery">
                      <h2>Gallery</h2>
                      <div className="galleryGrid">
                        {ele.packages_galleries.slice(0, 3).map((e, index) => (
                          <img
                            src={`/uploads/${e.name}`}
                            alt={`Image ${index + 1}`}
                            key={index}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      }))

      }
    </>



  );
};

export default Itinerary;
