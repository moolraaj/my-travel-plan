
// /app/(admin)/admin/(countries)/countries/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function CountryPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch('/api/v1/countries/get');
        const data = await response.json();
        if (data.success) {
          setCountries(data.result);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  const handleAddClick = () => {
    router.push('/admin/countries/add-countries');
  };



  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        const response = await fetch(`/api/v1/country/delete/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.success) {
          setCountries(countries.filter(country => country._id !== id));
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
      <h2>Countries</h2>
      {error && <div className="error">{error}</div>}
      <div className="packages-table-container">
        <div></div>
        <table className="packages-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>City Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="loading">Loading...</td>
              </tr>
            ) : (
              countries.map(country => (
                <tr key={country._id}>
                  <td data-label="Image">
                    <img 
                      src={`/uploads/${country.images[0].name}`} 
                      alt={country.title} 
                      className="package-image" 
                    />
                  </td>
                  <td data-label="Title">{country.title}</td>
                  <td data-label="Description">{country.description}</td>
                  <td data-label="Countries Count">{country.citiesCount}</td>
                  <td data-label="Actions" className="actions">
                    <FaEye className="action-icon view" title="View" />
                    <FaEdit className="action-icon edit" title="Edit"  />
                    <FaTrashAlt className="action-icon delete" title="Delete" onClick={() => handleDelete(country._id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="floating-plus" onClick={handleAddClick}>
        <FaPlus />
        <div className="tooltip">Add Countries</div>
      </div>
    </div>
  );
}

export default CountryPage;


