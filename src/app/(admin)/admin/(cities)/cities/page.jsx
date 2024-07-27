
// /app/(admin)/admin/(cities)/cities/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function CityPage() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch('/api/v1/cities/get');
        const data = await response.json();
        if (data.success) {
          setCities(data.results);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCities();
  }, []);

  const handleAddClick = () => {
    router.push('/admin/cities/add-cities');
  };



  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        const response = await fetch(`/api/v1/city/delete/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.success) {
          setCities(cities.filter(city => city._id !== id));
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        setError('Failed to delete package, please try again.');
      }
    }
  };

  return (
    <div className="packages">
      <h2>Cities</h2>
      {error && <div className="error">{error}</div>}
      <div className="packages-table-container">
        <div></div>
        <table className="packages-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Package Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="loading">Loading...</td>
              </tr>
            ) : (
              cities.map(city => (
                <tr key={city._id}>
                  <td data-label="Image">
                    <img 
                      src={`/uploads/${city.images[0].name}`} 
                      alt={city.title} 
                      className="package-image" 
                    />
                  </td>
                  <td data-label="Title">{city.title}</td>
                  <td data-label="Description">{city.description}</td>
                  <td data-label="Countries Count">{city.all_packages ? city.all_packages.length : 0}</td>
                  <td data-label="Actions" className="actions">
                    <FaEye className="action-icon view" title="View" />
                    <FaEdit className="action-icon edit" title="Edit"  />
                    <FaTrashAlt className="action-icon delete" title="Delete" onClick={() => handleDelete(city._id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="floating-plus" onClick={handleAddClick}>
        <FaPlus />
        <div className="tooltip">Add Cities</div>
      </div>
    </div>
  );
}

export default CityPage;


