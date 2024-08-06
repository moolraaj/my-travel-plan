import Image from 'next/image';
import Link from 'next/link';
 
 
 



const Explorations = ({slug,country}) => {


  
  


  let result=country?country.result:[]
  let reverseCountry=Array.isArray(result)?[...result].reverse():[]


  console.log(`country`)
  console.log(country)

  return (
    <div className="explorations">
        <div className="explorations-grid">
        {reverseCountry===null||reverseCountry.length===0?('no result found'):(reverseCountry.map((exploration, index) => (
          <div key={index} className="exploration-item">
          <Link href={`/${slug}/${exploration.slug}`}>
           
            
            {exploration.images ? exploration.images.map((e) => (
                  <Image
                    key={e._id}
                    src={`/uploads/${e.name}`}
                    alt={country.name}
                    width={400}
                    height={330}
                    className="image"
                  />
                )) : 'no image found'}
            
            </Link>
            <div className="exploration-details">
             <div className='explore_l'>
              <h3>Explorations {slug}</h3>
              <p>{exploration.title}</p>
              </div>
              <div className='icon_custom'>
                <img src='/images/arrowu.png' alt='images'/>
              </div>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
};

export default Explorations;
