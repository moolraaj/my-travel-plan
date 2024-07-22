import Image from 'next/image';
import Link from 'next/link';


const packagesData = [
  { title: 'Netherlands 5N - 6D', nights: '3 Night / 4 Days', customizable: 'Customizable', rating: 4.0, reviews: '1.3k Review', price: '₹ 39,550', imgSrc: '/images/netherland.png' },
  { title: 'Netherlands 5N - 6D', nights: '3 Night / 4 Days', customizable: 'Customizable', rating: 4.0, reviews: '1.3k Review', price: '₹ 39,550', imgSrc: '/images/netherlandone.png' },
  { title: 'Netherlands 5N - 6D', nights: '3 Night / 4 Days', customizable: 'Customizable', rating: 4.0, reviews: '1.3k Review', price: '₹ 39,550', imgSrc: '/images/netherlandtwo.png' },
  { title: 'Netherlands 5N - 6D', nights: '3 Night / 4 Days', customizable: 'Customizable', rating: 4.0, reviews: '1.3k Review', price: '₹ 39,550', imgSrc: '/images/netherlandthree.png' },
];

const BestSellingPackages = () => {
  return (
    <div className="container card_main_section">
      <div className="header">
        <h1>Explore Best Selling Packages</h1>
        <div className='link_heading'>
        <p>Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
        <Link href="#"><span className="view-all">View All Packages</span></Link>
        </div>
      </div>

     <div className='card_discount'>
      <div className="packages">
        {packagesData.map((pkg, index) => (
          <div key={index} className="package">
            <Image src={pkg.imgSrc} alt={pkg.title} width={333} height={380} />
            <div className="info">
              <h3>{pkg.title}</h3>
              <p>{pkg.nights} | {pkg.customizable}</p>
              <p className="rating">
                <span className="star">⭐</span> {pkg.rating} ({pkg.reviews})
              </p>
              <p className="price">From {pkg.price}</p>
              <div className="buttons">
                <button className="details-btn">View Details</button>
                <button className="enquiry-btn">Enquiry Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>



      <div className='discount_section'>
       <span>Up to 40% Discount!</span>
      <button>Discover More</button>
    </div>
</div> 
    
    </div>
  );
};

export default BestSellingPackages;
