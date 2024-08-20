
'use client'

import { EXPORT_ALL_APIS } from '@/utils/apis/api'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import explorebg from '../../../app/assets/home_images/explore-package-bg.png';
import emptyImage from '../../../app/assets/empty.jpg';
import Image from 'next/image';
import { getSession } from 'next-auth/react';
import BookingForm from '@/Components/(bookings)/bookings/bookingForm';
import LoginPopup from '@/Components/loginPopup/Components/popup';

function PackagesCatPackages({ slug }) {
  const api = EXPORT_ALL_APIS();
  const [data, setData] = useState([]);
  const [userVerified, setUserVerified] = useState(false);
  const [isopenForm, setIsopenForm] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const fetchSinglePackage = async () => {
    try {
      const resp = await api.loadSinglePackagesActivity(slug);
      if (resp && resp.result) {
        setData(resp.result);
      } else {
        console.error('No data found or error in response:', resp);
      }
    } catch (error) {
      console.error('Error fetching single package:', error);
    }
  };
  const checkUserVerification = async () => {
    try {
      const session = await getSession();
      if (session && session.user) {
        setUserVerified(session.user.role === 'user');
      } else {
        setUserVerified(false);
      }
    } catch (error) {
      console.error('Error checking verification:', error);
    }
  };

  const bookingAndLogin = (pkgId) => {
    if (!userVerified) {
      setIsLogin(true);
    } else {
      setSelectedPackageId(pkgId);
      setIsopenForm(true);
    }
  };

  useEffect(() => {
    fetchSinglePackage();
    checkUserVerification();
  }, [slug]);

  console.log('single activity data:', data);



  return (
    <div>
      {isopenForm && <BookingForm setIsopenForm={setIsopenForm} packageId={selectedPackageId} />}
      {isLogin && <LoginPopup setIsLogin={setIsLogin} />}
      <div className="explore-packages" style={{ backgroundImage: `url(${explorebg.src})` }}>
        <div className="container card_main_section">

          {data.map((item, index) => (
            <div key={index} className='card_category_section'>

              <div className='card_discount'>
                <div className="packages">
                  {item === undefined || item === null ? (
                    'no result found'
                  ) : (
                    item.packages.map(pkg =>
                      <div key={pkg._id} className="package">
                        {pkg.images && pkg.images.length > 0 ? (
                          pkg.images.map((image) => (
                            <Image
                              key={image._id}
                              src={`/uploads/${image.name}`}
                              alt={pkg.name || "loading..."}
                              width={333}
                              height={380}
                              className="image"
                            />
                          ))
                        ) : (
                          <Image
                            src={emptyImage.src}
                            alt="No Image Available"
                            width={333}
                            height={380}
                            className="image"
                          />
                        )}
                        <div className="info">
                          <h3>{pkg.title}</h3>
                          <p>{pkg.package_nights} nights / {pkg.package_days} days</p>

                          <p className="price">From ₹ {pkg.package_price || 0}</p>
                          <div className="buttons">
                            <Link href={`/packages/${pkg.title.trim().toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-')}`}>
                              <button className="details-btn">View Details</button>
                            </Link>
                            <button className="enquiry-btn" onClick={() => bookingAndLogin(pkg._id)}>Book Now</button>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default PackagesCatPackages;
