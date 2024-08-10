
import Link from 'next/link';
import Image from 'next/image';
import triangle from '../app/assets/home_images/triangle.png';
import camerabg from '../app/assets/home_images/camera-bg.png';

import emptyImage from '../app/assets/empty.jpg';

function WorldSection({loading,continent}) {

  let result=continent?continent.result:[]
   

  let reversedContinents =Array.isArray(result)? [...result].reverse():[];

  

  return (
    <div className='world-country' style={{ backgroundImage: `url(${camerabg.src})` }}>
      <div className="grid-container">
        {reversedContinents === undefined||reversedContinents===null ? (
          <EmptyComponent />
        ) : (
          reversedContinents.slice(0, 5).map((country, index) => (
            <Link className="card_outer" href={`/continent/${country.slug.toLowerCase().replace(' ', '-')}`} key={index}>
              <div className="card">
                <div className="overlay">
                  <div className="label">{country.total_countries} Countries <Image src={triangle} alt="Triangle" style={{width: 'auto', height: 'auto'}}/></div>
                </div>
                {country.images && country.images.length > 0 ? (
                  <Image
                    src={`/uploads/${country.images[0].name}`}
                    alt={country.name || "loading..."}
                    style={{ width: '100%', height: '100%' }}
                    width={1000}
                    height={300}
                    className="image"
                  />
                ) : (
                  <div className="no-image">No Image Available</div>
                )}
                <div className="text">{country.title}</div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

function EmptyComponent() {
  return (
    <>
      {Array(5).fill().map((_, index) => (
        <Link className="card_outer" href="#" key={index}>
          <div className="card">
            <div className="overlay">
              <div className="label">Loading... <Image src={triangle} alt="Triangle"  style={{width: 'auto', height: 'auto'}}/></div>
            </div>
            <Image
              src={emptyImage.src}
              alt="Loading"
              style={{ width: '100%', height: '100%' }}
              width={1000}
              height={300}
              className="image"
            />
            <div className="text">Loading...</div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default WorldSection;
