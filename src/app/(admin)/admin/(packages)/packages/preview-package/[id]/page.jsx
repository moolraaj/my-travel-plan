
// /app/(admin)/admin/(cities)/cities/preview-city/[id]/page.jsx

'use client';
import React, { useEffect, useState } from 'react';

function PreviewPackage({ params }) {
  const { id } = params;
  const [pkgs, setPkgs] = useState({
    title: '',
    description: '',
    slug: '',
    images: [],

  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchPkgs() {
    try {
      const response = await fetch(`/api/v1/package/getbyid/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.success) {
        setPkgs(data.result);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error fetching Pkgs data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPkgs();
  }, [id]);

  return (
    <div className="preview-continent-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <h2><strong>Package Name:</strong> {pkgs.title}</h2>
          <p><strong>Package Description:</strong> {pkgs.description}</p>
          <p><strong>Slug:</strong> {pkgs.slug}</p>
          <div className="preview-continent-images">
            {pkgs.images.length > 0 ? (
              pkgs.images.map((image, index) => (
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
        </>
      )}
    </div>
  );
}

export default PreviewPackage;


