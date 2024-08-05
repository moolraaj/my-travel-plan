'use client'
import Image from 'next/image';
import Link from 'next/link';
import discountc from '../app/assets/home_images/discountcards.png';
import explorebg from '../app/assets/home_images/explore-package-bg.png';
import { useEffect, useState } from 'react';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';

 

const BestSellingPackages = () => {
  let api=EXPORT_ALL_APIS()
  let [data,setData]=useState([])

  let loadAllPackages=async()=>{
    let resp=await api.loadAllPackages()
    setData(resp)
  }
  useEffect(()=>{
    loadAllPackages()
  },[])
  let result=data?data.result:[]
  let reversedPackages=Array.isArray(result)?[...result].reverse():[]

  console.log(`result`)
  console.log(result)
  return (
    <div className="explore-packages" style={{ backgroundImage: `url(${explorebg.src})`}}>
      <div className="container card_main_section">
      <div className="header_best_selling">
        <h2 className='same_heading'>Explore Best Selling Packages</h2>
        <div className='link_heading'>
        <p>Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
        <Link href="/packages"><span className="view-all">View All Packages</span></Link>
        </div>
      </div>

     <div className='card_discount'>
      <div className="packages">
        {reversedPackages===null||reversedPackages===undefined?('no result found'):(reversedPackages.slice(0,4).map((pkg, index) => (
          <div key={index} className="package">
           
            {pkg.images === null || pkg.images === undefined ? ('no result found') : pkg.images.map((e) => {
                return <Image
                  key={e._id}
                  src={`/uploads/${e.name}`}
                  alt={pkg.name}
                 
                  width={333}
                  height={380}
                  className="image"
                />
              })}
            <div className="info">
              <h3>{pkg.title}</h3>
              <p>{pkg.package_nights} nights / {pkg.package_days} days | {pkg.customizable}</p>
              <p className="rating">
                <span className="star">★ {pkg.rating}  </span> ({pkg.reviews})
              </p>
              <p className="price">From ₹ {pkg.package_price||0}</p>
              <div className="buttons">
              <Link href="/packages"> <button className="details-btn">View Details</button> </Link>
                <button className="enquiry-btn">Enquiry Now</button>
              </div>
            </div>
          </div>
        )))}
      </div>



      <div className='discount_section' style={{
                  backgroundImage: `url(${discountc.src})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                                 }} >
        <span>Up to 40% Discount!</span>
        <button>Discover More</button>
    </div>
</div> 
    
      </div>
    </div>
 
  );
};

export default BestSellingPackages;
