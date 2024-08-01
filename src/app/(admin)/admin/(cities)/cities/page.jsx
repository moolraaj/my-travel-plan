
// // // /app/(admin)/admin/(cities)/cities/page.jsx


'use client';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CityPage() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage] = useState(4); // Number of items per page
  const totalPages = Math.ceil(totalResults / itemsPerPage); // Calculate total pages
  const router = useRouter();

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(`/api/v1/cities/get?page=${currentPage}&limit=${itemsPerPage}`);
        const data = await response.json();
        if (data.success) {
          setCities(data.result);
          setTotalResults(data.totalResults); // Set totalResults from API
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCities();
  }, [currentPage]);

  const handleAddClick = () => {
    router.push('/admin/cities/add-city');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this city?')) {
      try {
        const response = await fetch(`/api/v1/city/delete/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setCities(cities.filter(city => city._id !== id));
          toast.success('City deleted successfully');
        } else {
          toast.error('Failed to delete city, please try again.');
        }
      } catch (error) {
        toast.error('Failed to delete city, please try again.');
      }
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/cities/update-city/${id}`);
  };

  const handlePreview = (id) => {
    router.push(`/admin/cities/preview-city/${id}`);
  };

  return (
    <div className="packages">
      <ToastContainer />
      <h2>Cities</h2>
      {error && <div className="error">{error}</div>}
      <div className="packages-table-container">
        <table className="packages-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Package Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="loading">Loading...</td>
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
                  <td data-label="ID">{city._id}</td>
                  <td data-label="Title">{city.title}</td>
                  <td data-label="Description">{city.description}</td>
                  <td data-label="Package Count">{city.packages ? city.packages.length : 0}</td>
                  <td data-label="Actions">
                    <span className="actions">
                      <FaEye className="action-icon view" title="View" onClick={() => handlePreview(city._id)} />
                      <FaEdit className="action-icon edit" title="Edit" onClick={() => handleEdit(city._id)} />
                      <FaTrashAlt className="action-icon delete" title="Delete" onClick={() => handleDelete(city._id)} />
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          {'<<'}
        </button>
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          {'<'}
        </button>
        <span className="pagination-info">Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          {'>'}
        </button>
        <button 
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          {'>>'}
        </button>
      </div>
      <div className="floating-plus" onClick={handleAddClick}>
        <FaPlus />
        <div className="tooltip">Add City</div>
      </div>
    </div>
  );
}

export default CityPage;
