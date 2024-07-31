import React, { useState } from 'react';

const Itinerary = () => {
  const [openDay, setOpenDay] = useState(null);
  const [activeTab, setActiveTab] = useState('inclusions');


  const toggleDay = (day) => {
    setOpenDay(openDay === day ? null : day);
  };

  const itineraryData = [
    { day: 1, description: 'Arrive Paris, France' },
    { day: 2, description: 'Paris City Tour River Seine Cruise Eiffel Tower Tour' },
    { day: 3, description: 'Paris City Tour River Seine Cruise Eiffel Tower Tour' },
    { day: 4, description: 'Paris City Tour River Seine Cruise Eiffel Tower Tour' },
  ];


  const galleryImages = [
    '/images/gallerya.png',
    '/images/galleryc.png',
    '/images/gallerb.png',
    '/images/galleryf.png',
    '/images/galleryd.png',
    '/images/galleryf.png',
  ];


  const inclusionsContent = (
    <div>
      <h3>Inclusions & Exclusions</h3>
      <h4>Inclusion</h4>
      <ul>
        <li>Inclusion 1</li>
        <li>Inclusion 2</li>
        <li>Exclusion 1</li>
        <li>Exclusion 2</li>
      </ul>

      <h4>Exclusion</h4>
      <ul>
        <li>Exclusion 1</li>
        <li>Exclusion 2</li>
        <li>Exclusion 3</li>
        <li>Exclusion 4</li>
      </ul>
    </div>
  );

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
<div className='overview'>

<div className='over'>
    <h2 className='heading_inner_page'>Overview</h2>
    <p>Mesmerizing 4-night, 5-day journey with our Passionate Paris With Disney tour, seamlessly blending the romance of Parisian streets with the enchantment of Disneyland Paris. Begin your adventure immersing in Paris is iconic landmarks like the Eiffel Tower and Notre-Dame Cathedral, followed by leisurely explorations of charming neighborhoods and delectable French cuisine. Then, venture into the whimsical realm of Disneyland Paris, where fairy tales come alive with thrilling rides, captivating shows, and encounters with beloved Disney characters. Whether strolling along the Seine or posing for photos with Mickey Mouse, this tour promises an unforgettable fusion of culture, magic, and memories, offering the perfect escapade for travelers of all ages.</p>
</div>


<div className='summary_slider'>   
    <div className="itinerary_inner">
    <div className='itenary_contact'>
    <div className='top_summary'>
    <div className='top_summary_inner'>
        <h2 className='heading_inner_page'>Top Summary</h2>
               <p>Embark on an enchanting journey through the heart of Europe with our Passionate Paris With Disney tour, spanning four nights and five days of unforgettable experiences. This meticulously crafted itinerary seamlessly blends the timeless romance of Paris with the whimsical charm of Disneyland Paris, offering travelers a truly magical fusion of culture, adventure, and fantasy.
         <br/>Your adventure begins in the iconic city of Paris, where you will be swept away by the beauty of its historic landmarks and vibrant streets. Over the course of two days, explore must-see sights such as the majestic Eiffel Tower, the awe-inspiring Notre-Dame Cathedral, and the world-renowned Louvre Museum, home to priceless works of art. Wander through picturesque neighborhoods like Montmartre and Le Marais, immersing yourself in the city is rich culture and culinary delights at charming cafes and bistros
        </p>
            </div>
            </div>


    <h2 className='heading_inner_page'>Itinerary</h2>
      {itineraryData.map((item) => (
        <div key={item.day} className="day">
          <div className="dayHeader" onClick={() => toggleDay(item.day)}>
            <span>Day {item.day}: {item.description}</span>
            <span>{openDay === item.day ? '↑' : '↓'}</span>
          </div>
          {openDay === item.day && (
            <div className="dayContent">
              <p>{item.description}</p>
            </div>
          )}
        </div>
      ))}


<div className="tabs">
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
        {activeTab === 'inclusions' ? inclusionsContent : hotelActivitiesContent}
      </div>
       

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



        <div className='gallery_inner_page'>
        <div className="gallery">
        <h2>Gallery</h2>
        <div className="galleryGrid">
          {galleryImages.map((image, index) => (
            <img key={index} src={image} alt={`Gallery Image ${index + 1}`} />
          ))}
        </div>
      </div>

            </div>
         </div>


    </div>
    </div>

    </div>


  );
};

export default Itinerary;
