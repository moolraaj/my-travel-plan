
// /app/(admin)/admin/(continents)/continents/preview-continent/[id]/page.jsx

'use client';
import React, { useEffect, useState } from 'react';

function PreviewContinent({ params }) {
  const [continent, setContinent] = useState({
    title: '',
    slug: '',
    description: '',
    images: [],
    countries: [],
    total_countries: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = params;

  useEffect(() => {
    async function fetchContinent() {
      try {
        const response = await fetch(`/api/v1/continent/get/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.success) {
          setContinent(data.result);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Error fetching continent data.');
      } finally {
        setLoading(false);
      }
    }

    fetchContinent();
  }, [id]);

  return (
    <div className="preview-continent-container">
      <h1 className="preview-continent-heading">Preview Continent</h1>
      {loading && <p className="preview-continent-loading">Loading...</p>}
      {error && <p className="preview-continent-error">{error}</p>}
      {!loading && !error && (
        <div className="preview-continent-content">
          <h2 className="preview-continent-title">{continent.title}</h2>
          <p className="preview-continent-slug">Slug: {continent.slug}</p>
          <p className="preview-continent-description">{continent.description}</p>
          {continent.images.map((image, index) => (
            <img
              key={index}
              src={`/uploads/${image}`}
              alt={continent.title}
              className="preview-continent-image"
            />
          ))}
          <div className="preview-continent-countries">
            <h3>Total Countries: {continent.total_countries}</h3>
            {continent.countries.map((country, index) => (
              <div key={index} className="preview-country">
                <h4>{country.title}</h4>
                <p>Slug: {country.slug}</p>
                <p>Description: {country.description}</p>
                {country.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={`/uploads/${image}`}
                    alt={country.title}
                    className="preview-country-image"
                  />
                ))}
                <h5>Cities ({country.totalCities}):</h5>
                <ul>
                  {country.cities.map((city) => (
                    <li key={city._id}>
                      {city.city_name} - Packages: {city.city_packages_count}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PreviewContinent;
