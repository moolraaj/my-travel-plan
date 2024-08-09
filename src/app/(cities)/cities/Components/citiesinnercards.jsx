'use client'
import Image from 'next/image';
import Link from 'next/link';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import { useEffect, useState } from 'react';

const Explorations = ({ slug, country}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const api = EXPORT_ALL_APIS();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.loadSingleCountry(slug);
        if (result.success) {
          setData(result.result);
        } else {
          setError('No data found');
        }
      } catch (error) {
        setError('An error occurred while fetching data');
      }
    };

    fetchData();
  }, [slug]);

  if (error) {
    return <div>{error}</div>;
  }

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="explorations">
      <div className="explorations-grid">
        {data.length === 0 ? (
          'No result found'
        ) : (
          data.map((exploration, index) => (
            <div key={index} className="exploration-item">
              <Link href={`/${continent.slug}/${country.slug}/${exploration.slug}`}>
                  {exploration.images ? (
                    exploration.images.map((e) => (
                      <Image
                        key={e._id}
                        src={`/uploads/${e.name}`}
                        alt={exploration.title}
                        width={400}
                        height={330}
                        className="image"
                      />
                    ))
                  ) : (
                    'No image found'
                  )}
                
              </Link>
              <div className="exploration-details">
                <div className="explore_l">
                  <p>Packages {exploration.city_packages_count}</p>
                  <h3>Explorations in {country.title}</h3>
                  <p>{exploration.title}</p>
                </div>
                <div className="icon_custom">
                  <img src="/images/arrowu.png" alt="arrow" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Explorations;
