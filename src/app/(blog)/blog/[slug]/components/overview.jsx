import Image from 'next/image'; 
import React, { useState } from 'react'; 
const Bloggallery = () => {
  
   return (
  <div className='overview blog-inner-page' >
 
      <div className='summary_slider'>
          <div className="itinerary_inner">
              <div className='itenary_contact'>
                  <div className='top_summary'>
                      <div className='top_summary_inner'>
                          <h2 className='heading_inner_page'>Top Summary</h2>
                          <p>Embark on an enchanting journey through the heart of Europe with our Passionate Paris With Disney tour, spanning four nights and five days of unforgettable experiences. This meticulously crafted itinerary seamlessly blends the
                              timeless romance of Paris with the whimsical charm of Disneyland Paris, offering travelers a truly magical fusion of culture, adventure, and fantasy.
                            <span>
                              Your adventure begins in the iconic city of Paris, where you will be swept away by the beauty of its historic landmarks and vibrant streets. Over the course of two days, explore must-see sights such as the majestic Eiffel Tower, the awe-inspiring Notre-Dame Cathedral, and the world-renowned Louvre Museum, home to priceless works of art. Wander through picturesque neighborhoods like Montmartre and Le Marais, immersing yourself in the city is rich culture and culinary delights at charming cafes and bistros
                            </span>
                          </p>
                      </div>
                  </div>
              </div>
  
              <div className='right_query'>
                  <div className='card_contact'>
                      
                      <div className='question'>
                          <h1>Have a Question?</h1>
                          <p>Do not hesitage to give us a call. We are an expert team and we are happy to talk to you</p>
                          <div className='contact_card'>
                              <a href='tel:+91 8627814386'>+91 8627814386</a>
                              <a href='mailto:booking@streetromeo.com'>booking@streetromeo.com</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  
  </div>
  
  
  ); }; export default Bloggallery;