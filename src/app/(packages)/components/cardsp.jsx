import Image from 'next/image';
import Link from 'next/link';

const packagesData = [
  { slug: 'netherlands-5n-6d', title: 'Netherlands 5N - 6D', nights: '3 Night / 4 Days', customizable: 'Customizable', rating: 4.0, reviews: '1.3k Review', price: '₹ 39,550', imgSrc: '/images/netherland.png' },
  { slug: 'netherlands-5n-6d-1', title: 'Netherlands 5N - 6D', nights: '3 Night / 4 Days', customizable: 'Customizable', rating: 4.0, reviews: '1.3k Review', price: '₹ 39,550', imgSrc: '/images/netherlandone.png' },
  { slug: 'netherlands-5n-6d-2', title: 'Netherlands 5N - 6D', nights: '3 Night / 4 Days', customizable: 'Customizable', rating: 4.0, reviews: '1.3k Review', price: '₹ 39,550', imgSrc: '/images/netherlandtwo.png' },
  { slug: 'netherlands-5n-6d-3', title: 'Netherlands 5N - 6D', nights: '3 Night / 4 Days', customizable: 'Customizable', rating: 4.0, reviews: '1.3k Review', price: '₹ 39,550', imgSrc: '/images/netherlandthree.png' },
  { slug: 'netherlands-5n-6d-4', title: 'Netherlands 5N - 6D', nights: '3 Night / 4 Days', customizable: 'Customizable', rating: 4.0, reviews: '1.3k Review', price: '₹ 39,550', imgSrc: '/images/netherland.png' },
  { slug: 'netherlands-5n-6d-5', title: 'Netherlands 5N - 6D', nights: '3 Night / 4 Days', customizable: 'Customizable', rating: 4.0, reviews: '1.3k Review', price: '₹ 39,550', imgSrc: '/images/netherlandone.png' },
  { slug: 'netherlands-5n-6d-6', title: 'Netherlands 5N - 6D', nights: '3 Night / 4 Days', customizable: 'Customizable', rating: 4.0, reviews: '1.3k Review', price: '₹ 39,550', imgSrc: '/images/netherlandtwo.png' },
  { slug: 'netherlands-5n-6d-7', title: 'Netherlands 5N - 6D', nights: '3 Night / 4 Days', customizable: 'Customizable', rating: 4.0, reviews: '1.3k Review', price: '₹ 39,550', imgSrc: '/images/netherlandthree.png' },
];

const Allpackages = () => {
  return (
    <div className="container card_main_section">
      <div className="card_discount">
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
                  <Link href={`/packages/${pkg.slug}`}>
                    <button className="details-btn">View Details</button>
                  </Link>
                  <button className="enquiry-btn">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allpackages;
