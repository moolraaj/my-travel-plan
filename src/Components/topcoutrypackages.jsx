import Image from 'next/image';
import Link from 'next/link';
import trending from '../app/assets/home_images/trending.png';
import ribbon from '../app/assets/home_images/ribbon.png';


const countriesData = [
  { name: 'Austria', countries: 5, imgSrc: '/images/austria.png' },
  { name: 'Belgium', countries: 3, imgSrc: '/images/belgium.png' },
  { name: 'Czech Republic', countries: 7, imgSrc: '/images/czechrepublic.png' },
  { name: 'Denmark', countries: 2, imgSrc: '/images/denmark.png' },
  { name: 'Estonia', countries: 1, imgSrc: '/images/estonia.png' },
  { name: 'Finland', countries: 5, imgSrc: '/images/finland.png' },
  { name: 'France', countries: 6, imgSrc: '/images/france.png' },
  { name: 'Germany', countries: 3, imgSrc: '/images/germany.png' },
];

const Destinations = () => {
  return (
    <div className="topdestination container inner-w-container">
      <h1>Top Destination By Our Travel Experts</h1>
      <p>Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
      <div className="destinations">
        {countriesData.map((country, index) => (
          <div key={index} className="destination">
            <Image src={country.imgSrc} alt={country.name} width={320} height={242} />            
            <span
                style={{
                  backgroundImage: `url(${ribbon.src})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                                 }}
                className="trending"
              ><img src={trending.src}></img>Trending</span>
            <div className="info">
              <h3>{country.name}</h3>
              <p>{country.countries} Packages</p>
              
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default Destinations;
