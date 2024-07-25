import Image from 'next/image';

const explorations = [
  { country: 'Switzerland', city: 'Zurich', imgSrc: '/images/switzerland.jpg' },
  { country: 'Sweden', city: 'Stockholm', imgSrc: '/images/sweden.jpg' },
  { country: 'Spain', city: 'Barcelona', imgSrc: '/images/spain.jpg' },
  { country: 'Slovenia', city: 'Ljubljana', imgSrc: '/images/slovenia.jpg' },
  { country: 'Slovakia', city: 'Bratislava', imgSrc: '/images/slovakia.jpg' },
  { country: 'Portugal', city: 'Porto', imgSrc: '/images/portugal.jpg' },
];



const Explorations = () => {
  return (
    <div className="explorations">
      <h2>Explorations</h2>
      <div className="explorations-grid">
        {explorations.map((exploration, index) => (
          <div key={index} className="exploration-item">
            <Image
              src={exploration.imgSrc}
              alt={`${exploration.city}, ${exploration.country}`}
              width={300}
              height={200}
              className="exploration-image"
            />
            <div className="exploration-details">
              <h3>Explorations {exploration.country}</h3>
              <p>{exploration.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explorations;
