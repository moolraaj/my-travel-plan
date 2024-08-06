'use client'
import Image from 'next/image';
import Link from 'next/link';
import trending from '../app/assets/home_images/trending.png';
import ribbon from '../app/assets/home_images/ribbon.png';
import fishbg from '../app/assets/home_images/fish-bg.png';
import { useEffect, useState } from 'react';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';


 

const Destinations = () => {
  let api = EXPORT_ALL_APIS()
  let [data, setData] = useState([])
  let fetchAllCountries = async () => {
    let resp = await api.loadAllCountries()
    setData(resp)
  }

  useEffect(() => {
    fetchAllCountries()
  }, [])

  let result = data ? data.result : [];

  let reversedCountries = Array.isArray(result) ? [...result].reverse() : [];

  return (
    <div className='top-destination' style={{ backgroundImage: `url(${fishbg.src})` }}>
      <div className="topdestination container inner-w-container">
        <h2 className='same_heading'>Top Destination By Our Travel Experts</h2>
        <p>Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
        <div className="destinations expert-travel">
          {reversedCountries===null||reversedCountries===undefined?('no result found'):(reversedCountries.slice(0,8).map((country, index) => (
            <Link href={`/${country.slug.toLowerCase().replace(' ', '-')}`} key={country._id}>

            <div key={index} className="destination">
             
              {country.images === null || country.images === undefined ? ('no result found') : country.images.map((e) => {
                return <Image
                  key={e._id}
                  src={`/uploads/${e.name}`}
                  alt={country.name}
                  width={1000}
                  height={300}
                  className="image-travel-expert"
                />
              })}

              <span
                style={{
                  backgroundImage: `url(${ribbon.src})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
                className="trending"
              >
                <img src={trending.src}></img>
                TREADING
              </span>

              
              <div className="info">
                <h3>{country.title}</h3>
                <p>{country.countries} Packages</p>

              </div>
            </div>
            </Link>
          )))}
        </div>

      </div>
    </div>
  );
};

export default Destinations;
