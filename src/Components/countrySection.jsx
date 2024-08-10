'use client';

 
import Link from 'next/link';
import Image from 'next/image';
import emptyImage from '../app/assets/empty.jpg';
import exploresection from '../app/assets/home_images/explore-bg.png';
 

function ExplorationsFarAway({loading,city}) {

  let data=city?city.result:[]
 

  

  let reversedFilterCities = Array.isArray(data) ? [...data].reverse() : [];

  return (
    <div className='explore-section' style={{ backgroundImage: `url(${exploresection.src})` }}>
      <div className="explorations-container container inner-w-container">
        <h2 className='same_heading'>Explore Best Cities</h2>
        <div className='link_heading'>
          <p>Ideal for 5-14 days trip</p>
          <Link href="/packages"><span className="view-all">View All Cities</span></Link>
        </div>

        <div className="destinations-grid">
          {loading || reversedFilterCities.length === 0 ? (
            <EmptyExplorationComponent />
          ) : (
            reversedFilterCities.slice(0, 6).map((destination) => (
              <Link href={`/city/${destination.slug}`} key={destination._id}>
              <div  className="destination-card">
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
              </Link>
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
