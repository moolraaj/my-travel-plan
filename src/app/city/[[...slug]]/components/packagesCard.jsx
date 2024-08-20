'use client'
 
import BookingForm from '@/Components/(bookings)/bookings/bookingForm';
import LoginPopup from '@/Components/loginPopup/Components/popup';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';



const CityAllpackages = ({ slug_one }) => {

    let api = EXPORT_ALL_APIS()

    let [data, setData] = useState([]);
    const [userVerified, setUserVerified] = useState(false);
    const [isopenForm, setIsopenForm] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [selectedPackageId, setSelectedPackageId] = useState(null);

    let loadSingleCityPackages = async () => {
        let resp = await api.loadSingleCity(slug_one)
        setData(resp)
    }

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
        loadSingleCityPackages();
        checkUserVerification();
    }, [])

    let result = data ? data.result : []

    return (
        <>
         {isopenForm && <BookingForm setIsopenForm={setIsopenForm} packageId={selectedPackageId} />}
         {isLogin && <LoginPopup setIsLogin={setIsLogin}  />}
         <div className="container card_main_section">
            <div className="card_discount">
                <div className="packages">
                    {result === undefined || result === null ? ('no result found') : (result?.map((pkg, index) => (
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
                                <p>{pkg.package_nights||0} nights / {pkg.package_days||0} days</p>
                                <p className="rating">
                                    <span className="star">⭐</span> {pkg.rating} ({pkg.reviews})
                                </p>
                                <p className="price">From ₹ {pkg.package_price||0}</p>
                                <div className="buttons">
                                    <Link href={`/packages/${pkg.slug.trim().toLowerCase().replace(/\s+/g, '-')}`}>
                                        <button className="details-btn">View Details</button>
                                    </Link>
                                    <button className="enquiry-btn" onClick={() => bookingAndLogin(pkg._id)}>Book Now</button>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
            </div>
        </div>
        </>
        
    );
};

export default CityAllpackages;
