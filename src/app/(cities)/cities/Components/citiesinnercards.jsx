import Image from 'next/image';
import Link from 'next/link';




const Explorations = ({ slug, country }) => {

 

  let result=country?country.result:[]

  return (
    <div className="explorations">
      <div className="explorations-grid">
        {result===undefined?('no result found'):(result.map((exploration, index) => (
          <div key={index} className="exploration-item">
            <Link href={`/${slug}/${exploration.slug}`}>
              
              {exploration.images ? exploration.images.map((e) => (
                <Image
                  key={e._id}
                  src={`/uploads/${e.name}`}
                  alt={e.title}
                  style={{ width: '100%', height: '100%' }}
                  width={400}
                  height={330}
                  className="exploration-image"
                />
              )) : 'No image found'}
            </Link>
            <div className="exploration-details">
              <div className='explore_l'>
                <h3>Explorations {exploration.slug}</h3>
                <p>{exploration.title}</p>
              </div>
              <div className='icon_custom'>
                <img src='/images/arrowu.png' />
              </div>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
};

export default Explorations;
