
import Image from 'next/image';
import Link from 'next/link';
import trending from '../../../app/assets/home_images/trending.png';
import ribbon from '../../../app/assets/home_images/ribbon.png';

const Countrycard = ({ slug, continent, country, slugType }) => {
    console.log('Slug Type:', slugType);
    console.log('Continent Data:', continent);
    console.log('Country Data:', country);

    if (slugType === 'continent') {
        const result = continent || [];
        const reverseContinent = Array.isArray(result) ? [...result].reverse() : [];

        return (
            <div className="topdestination container inner-w-container country_inner_cards">
                <h2 className='same_heading'>Top Destination By Our Travel Experts</h2>
                <p>Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
                <div className="destinations expert-travel">
                    {reverseContinent.length === 0 ? (
                        <p>No result found</p>
                    ) : (
                        reverseContinent.map((country, index) => (
                            <div key={index} className="destination country_destination">
                                <Link href={`/${slug}/${country.slug}`}>
                                    {country.images ? country.images.map((e) => (
                                        <Image
                                            key={e._id}
                                            src={`/uploads/${e.name}`}
                                            alt={country.name}
                                            style={{ width: '100%', height: '100%' }}
                                            width={1000}
                                            height={300}
                                            className="image"
                                        />
                                    )) : <p>No image found</p>}
                                </Link>
                                <span
                                    style={{
                                        backgroundImage: `url(${ribbon.src})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                    className="trending"
                                >
                                    <img src={trending.src} alt="Trending" />Trending
                                </span>
                                <div className="info">
                                    <h3>{country.title}</h3>
                                    <p>{country.total_cities} cities</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    } else if (slugType === 'country' && country) {
        return (
            <div className="country-detail">
                <h1>{country.title}</h1>
                {country.images && country.images.length > 0 ? (
                    country.images.map((e) => (
                        <Image
                            key={e._id}
                            src={`/uploads/${e.name}`}
                            alt={country.title}
                            width={1000}
                            height={600}
                            className="country-image"
                        />
                    ))
                ) : (
                    <p>No images available</p>
                )}
                <p>{country.description}</p>
                <p>{country.city_packages_count} Packages</p>
            </div>
            
        );
    }

    return <div>No data available</div>;
};

export default Countrycard;
