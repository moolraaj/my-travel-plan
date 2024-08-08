'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import emptyImage from '../app/assets/empty.jpg';
import exploresection from '../app/assets/home_images/explore-bg.png';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';

function ExplorationsFarAway() {
  let api = EXPORT_ALL_APIS();
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);

  const fetchAllLowestPriceCities = async () => {
    try {
      let resp = await api.loadAllCitiesWithLowestPrices();
      setData(resp.result || []);
    } catch (error) {
      console.error('Failed to load cities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLowestPriceCities();
  }, []);

  let reversedFilterCities = Array.isArray(data) ? [...data].reverse() : [];

  return (
    <div className='explore-section' style={{ backgroundImage: `url(${exploresection.src})` }}>
      <div className="explorations-container container inner-w-container">
        <h2 className='same_heading'>Explorations Far Away</h2>
        <div className='link_heading'>
          <p>Ideal for 5-14 days trip</p>
          <Link href="/packages"><span className="view-all">View All Cities</span></Link>
        </div>

        <div className="destinations-grid">
          {loading || reversedFilterCities.length === 0 ? (
            <EmptyExplorationComponent />
          ) : (
            reversedFilterCities.slice(0, 6).map((destination) => (
              <div key={destination._id} className="destination-card">
                {destination.images && destination.images.length > 0 ? (
                  destination.images.map((image) => (
                    <Image
                      key={image._id}
                      src={`/uploads/${image.name}`}
                      alt={destination.name || "loading..."}
                      className="destination-image"
                      width={1000}
                      height={300}
                    />
                  ))
                ) : (
                  <Image
                    src={emptyImage.src}
                    alt="empty_image"
                    className="destination-image"
                    width={1000}
                    height={300}
                  />
                )}
                <div className="destination-info">
                  <h3>{destination.title}</h3>
                  <p>From ₹ {destination.package ? destination.package.price : 'N/A'}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyExplorationComponent() {
  return (
    <>
      {Array(6).fill().map((_, index) => (
        <div key={index} className="destination-card">
          <Image
            src={emptyImage.src}
            alt="Loading"
            className="destination-image"
            width={1000}
            height={300}
          />
          <div className="destination-info">
            <h3>loading...</h3>
            <p>loading...</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default ExplorationsFarAway;
