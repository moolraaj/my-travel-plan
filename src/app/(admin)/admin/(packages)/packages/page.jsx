
// /app/(admin)/admin/(packages)/packages/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function Packages() {
  const [continents, setContinents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchContinents() {
      try {
        const response = await fetch('/api/v1/continents/get');
        const data = await response.json();
        if (data.success) {
          setContinents(data.result);
        }
      } catch (error) {
        console.error('Error fetching continents:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContinents();
  }, []);

  const handleAddClick = () => {
    router.push('/admin/packages/add-continent');
  };

  const handleUpdateClick = (id) => {
    router.push(`/admin/packages/update-continent?id=${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        const response = await fetch(`/api/v1/continent/delete/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.success) {
          setContinents(continents.filter(continent => continent._id !== id));
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
      <h2>Continents</h2>
      {error && <div className="error">{error}</div>}
      <div className="packages-table-container">
        <table className="packages-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Countries Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="loading">Loading...</td>
              </tr>
            ) : (
              continents.map(continent => (
                <tr key={continent._id}>
                  <td data-label="Image">
                    <img 
                      src={`/uploads/${continent.images[0].name}`} 
                      alt={continent.title} 
                      className="package-image" 
                    />
                  </td>
                  <td data-label="Title">{continent.title}</td>
                  <td data-label="Description">{continent.description}</td>
                  <td data-label="Countries Count">{continent.countriesCount}</td>
                  <td data-label="Actions" className="actions">
                    <FaEye className="action-icon view" title="View" />
                    <FaEdit className="action-icon edit" title="Edit" onClick={() => handleUpdateClick(continent._id)} />
                    <FaTrashAlt className="action-icon delete" title="Delete" onClick={() => handleDelete(continent._id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="floating-plus" onClick={handleAddClick}>
        <FaPlus />
        <div className="tooltip">Add Continent</div>
      </div>
    </div>
  );
}

export default Packages;


