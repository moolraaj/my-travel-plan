
// /app/(admin)/admin/(continents)/continents/preview-continent/[id]/page.jsx

'use client';
import React, { useEffect, useState } from 'react';

function PreviewContinent({ params }) {

  const {id} = params;
  const [continent, setContinent] = useState({
    title: '',
    description: '',
    slug: '',
    images: [],
    all_countries: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  useEffect(() => {
    fetchContinent();
  }, [id]);

  return (
    <div className="preview-continent-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <h2> <strong>Continent Name:</strong>  {continent.title}</h2>
          <p><strong>Continent Description:</strong> {continent.description}</p>
          <p><strong>Slug:</strong> {continent.slug}</p>
          <div className="preview-continent-images">
            {continent.images.map((image, index) => (
              <img
                key={index}
                src={`/uploads/${image.name}`}
                alt={image.name}
                className="preview-continent-image"
              />
              
            ))}
          </div>
          <div className="preview-continent-countries">
          <h3>Countries: {continent.all_countries? continent.all_countries.length : 0}</h3>
            <ul>
              {continent.all_countries.map((country, index) => (
                <li key={index}>{country}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default PreviewContinent;

