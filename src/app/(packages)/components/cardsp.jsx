'use client'
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';



const Allpackages = () => {

  let api = EXPORT_ALL_APIS()

  let [data, setData] = useState([])

  let fetchAllPackages = async () => {
    let resp = await api.loadAllPackages()
    setData(resp)
  }

  useEffect(() => {
    fetchAllPackages()
  }, [])

  let result = data ? data.result : []



  return (
    <div className="container card_main_section">
      <div className="card_discount">
        <div className="packages">
          {result === undefined || result === null ? ('no result found') : (result.map((pkg, index) => (
            <div key={index} className="package">
              {pkg.images ? pkg.images.map((e) => (
                <Image
                  key={e._id}
                  src={`/uploads/${e.name}`}
                  alt={e.title}
                  width={333} height={380}

                />
              )) : 'No image found'}
              <div className="info">
                <h3>{pkg.title}</h3>
                <p>{pkg.package_nights || 0} nights / {pkg.package_days} days</p>
                <p className="rating">
                  <span className="star">⭐</span> {pkg.rating} ({pkg.reviews})
                </p>
                <p className="price">From {pkg.package_price}</p>
                <div className="buttons">
                  <Link href={`/packages/${pkg.slug}`}>
                    <button className="details-btn">View Details</button>
                  </Link>
                  <button className="enquiry-btn">Book Now</button>
                </div>
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>

  );
};

export default Allpackages;
