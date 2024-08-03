
// // /app/(admin)/admin/(packages)/packages/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage] = useState(4); // Number of items per page
  const totalPages = Math.ceil(totalResults / itemsPerPage); // Calculate total pages
  const router = useRouter();

  async function fetchPackages() {
    try {
      const response = await fetch(`/api/v1/packages/get?page=${currentPage}&limit=${itemsPerPage}`);
      const data = await response.json();
      if (data.success) {
        setPackages(data.result);
        setTotalResults(data.totalResults); // Set totalResults from API
      } else {
        setError('Failed to fetch packages.');
      }
    } catch (error) {
      setError('Error fetching packages.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPackages();
  }, [currentPage]);

  const handleAddClick = () => {
    router.push('/admin/packages/add-packages');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        const response = await fetch(`/api/v1/package/delete/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.success) {
          fetchPackages();
          toast.success('Package deleted successfully.');
        } else {
          toast.error('Failed to delete package.');
        }
      } catch (error) {
        toast.error('Failed to delete package, please try again.');
      }
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/packages/update-package/${id}`);
  };

  const handlePreview = (id) => {
    router.push(`/admin/packages/preview-package/${id}`);
  };

  return (
    <div className="packages">
      <ToastContainer />
      <h2>Packages</h2>
      {error && <div className="error">{error}</div>}
      <div className="packages-table-container">
        <table className="packages-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="loading">Loading...</td>
              </tr>
            ) : (
              packages.map(pkg => (
                <tr key={pkg._id}>
                  <td data-label="Image">
                    <img 
                      src={`/uploads/${pkg.images[0].name}`} 
                      alt={pkg.title} 
                      className="package-image" 
                    />
                  </td>
                  <td data-label="ID">{pkg._id}</td>
                  <td data-label="Title">{pkg.title}</td>
                  <td data-label="Description">{pkg.description}</td>
                  <td data-label="Actions">
                    <span className="actions">
                      <FaEye className="action-icon view" title="View" onClick={() => handlePreview(pkg._id)} />
                      <FaEdit className="action-icon edit" title="Edit" onClick={() => handleEdit(pkg._id)} />
                      <FaTrashAlt className="action-icon delete" title="Delete" onClick={() => handleDelete(pkg._id)} />
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
        <div className="tooltip">Add Package</div>
      </div>
    </div>
  );
}

export default Packages;

