
// /app/(admin)/admin/(continents)/continents/preview-continent/[id]/page.jsx

'use client';
import React, { useEffect, useState } from 'react';

function PreviewContinent({ params }) {
  const { id } = params;
  const [continent, setContinent] = useState({
    title: '',
    description: '',
    slug: '',
    images: [],
    countries: [],
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
        setContinent(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error fetching Continent data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContinent();
  }, [id]);


 
  let{result}=continent

  console.log(continent)


  

  return (
    <div className="preview-continent-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
         <h1>{result._id}</h1>
          <div className="preview-continent-images">
            {continent.images===null ? (
              continent.images.map((image, index) => (
                <img
                  key={index}
                  src={`/uploads/${image.name}`}
                  alt={image.name}
                  className="preview-continent-image"
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div className="preview-continent-countries">
            <h3>Countries: </h3>
            
          </div>
        </>
      )}
    </div>
  );
}

export default PreviewContinent;


