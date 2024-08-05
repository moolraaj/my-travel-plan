
// /app/(admin)/admin/(cities)/cities/preview-city/[id]/page.jsx

'use client';
import { handelAsyncErrors } from '@/helpers/asyncErrors';
import React, { useEffect, useState } from 'react';

function PreviewPackage({ params }) {
  const { id } = params;
  const [pkgs, setPkgs] = useState({
    title: '',
    description: '',
    slug: '',
    packageOverview: '',
    packageTopSummary: '',
    packageItinerary: [],
    packages_galleries: [],
    packagesInclude: [],
    packagesExclude: [],

  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchPkgs() {
    return handelAsyncErrors(async () => {
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
      setLoading(false);
    })
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
         <h2><strong>Package ID:</strong> {pkgs._id}</h2>
            <h2><strong>Package Name:</strong> {pkgs.title}</h2>
            <div className="package_image">
            {pkgs.images.length > 0 ? (
              pkgs.images.map((image, index) => (
                <img
                  key={index}
                  src={`/uploads/${image.name}`}
                  alt={image.name}
                  className="preview-continent-image"
                  style={{maxWidth: '200px',width:'100%',height:'200px'}}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
            </div>
          <p><strong>Package Description:</strong> {pkgs.description}</p>
          <p><strong>Slug:</strong> {pkgs.slug}</p>
          <p><strong>Overview:</strong> {pkgs.packageOverview}</p>
          <p><strong>Top Summary:</strong> {pkgs.packageTopSummary}</p>
          <h3>Itinerary:</h3>
          <ul>
            {pkgs.packageItinerary.map((itinerary, index) => (
              <li key={index}>
                <p><strong>Day:</strong> {itinerary.day}</p>
                <p><strong>Location:</strong> {itinerary.location}</p>
                <p><strong>Tour Name:</strong> {itinerary.tourname}</p>
                <p><strong>Description:</strong> {itinerary.itinerary_description}</p>
              </li>
            ))}
          </ul>
          <table className="packages-table">
            <thead>
              <tr>
                <th>Inclusions:</th>
                <th>Exclusions:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {pkgs.packagesInclude.map((include, index) => (
              <p key={index}>{include.description}</p>
            ))}</td>
                <td> {pkgs.packagesExclude.map((exclude, index) => (
              <p key={index}>{exclude.description}</p>
            ))}</td>
              </tr>
            </tbody>
          </table>

          <table className="packages-table">
            <thead>
              <tr>
                <th>package_price</th>
                <th>package_discounted_price</th>
                <th>package_days</th>
                <th>package_nights</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>₹{pkgs.package_price || 0}</td>
                <td> ₹{pkgs.package_discounted_price || 0}</td>
                <td>{pkgs.package_days}</td>
                <td> {pkgs.package_nights}</td>
              </tr>
            </tbody>
          </table>
         
          <h3>Gallery:</h3>
          <div className="preview-continent-images" style={{display: 'flex',gap: '20px', flexWrap: 'wrap'}}>
            {pkgs.packages_galleries.length > 0 ? (
              pkgs.packages_galleries.map((image, index) => (
                <img
                  key={index}
                  src={`/uploads/${image.name}`}
                  alt={image.name}
                  className="preview-continent-image"
                  style={{width: '200px',height: '200px'}}
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


