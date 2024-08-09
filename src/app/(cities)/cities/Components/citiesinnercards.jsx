import Image from 'next/image';
import Link from 'next/link';
const explorations = [
  { country: 'Switzerland', city: 'Zurich', imgSrc: '/images/switzerland.png' },
  { country: 'Sweden', city: 'Stockholm', imgSrc: '/images/sweden.png' },
  { country: 'Spain', city: 'Barcelona', imgSrc: '/images/spain.png' },
  { country: 'Slovenia', city: 'Ljubljana', imgSrc: '/images/slovenia.png' },
  { country: 'Slovakia', city: 'Bratislava', imgSrc: '/images/slovakia.png' },
  { country: 'Portugal', city: 'Porto', imgSrc: '/images/portugal.png' },
];



const Explorations = ({slug}) => {
  console.log(slug)
  return (
    <div className="explorations">
        <div className="explorations-grid">
        {explorations.map((exploration, index) => (
          <div key={index} className="exploration-item">
          <Link href="/packages/netherlands-5n-6d"  >
            <Image
              src={exploration.imgSrc}
              alt={`${exploration.city}, ${exploration.country}`}
              width={400}
              height={330}
              className="exploration-image"
            />
            </Link>
            <div className="exploration-details">
             <div className='explore_l'>
              <h3>Explorations {exploration.country}</h3>
              <p>{exploration.city}</p>
              </div>
              <div className='icon_custom'>
                <img src='/images/arrowu.png'/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explorations;
