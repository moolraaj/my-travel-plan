'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import triangle from '../app/assets/home_images/triangle.png';

import camerabg from '../app/assets/home_images/camera-bg.png';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
// import './css.scss';

 


const World_section = () => {

  let [data, setData] = useState([])
  let api = EXPORT_ALL_APIS()


  const fetchAllContinents = async () => {
    let resp = await api.loadAllContinents()
    setData(resp)
  }

  useEffect(() => {
    fetchAllContinents()
  }, [])

  let result = data ? data.result : [];


   

  let reversedContinents = Array.isArray(result) ? [...result].reverse() : [];


  return (
    <div className='world-country' style={{ backgroundImage: `url(${camerabg.src})` }} >
      <div className="grid-container">
        {reversedContinents === null || reversedContinents.length===0 ? ('no result found') : (reversedContinents.slice(0, 5).map((country, index) => (
          <Link className="card_outer" href={`/${country.slug.toLowerCase().replace(' ', '-')}`} key={index}>
            <div className="card">
              <div className="overlay">
                <div className="label">{country.total_countries}-Countries <img src={triangle.src} /> </div>
              </div>

              {country.images === null || country.images === undefined ? ('no result found') : country.images.map((e) => {
                return <Image
                  key={e._id}
                  src={`/uploads/${e.name}`}
                  alt={country.name}
                  style={{ width: '100%', height: '100%' }}
                  width={1000}
                  height={300}
                  className="image"
                />
              })}

              <div className="text">{country.title}</div>
            </div>
          </Link>
        )))}
      </div>
    </div>
  );
};

export default World_section;