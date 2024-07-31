
// // /app/(admin)/admin/(packages)/packages/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage] = useState(4); // Number of items per page
  const totalPages = Math.ceil(totalResults / itemsPerPage); // Calculate total pages
  const router = useRouter();

  useEffect(() => {
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

    fetchPackages();
  }, [currentPage]);

  const handleAddClick = () => {
    router.push('/admin/packages/add-package');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete the selected packages?')) {
      try {
        await Promise.all(selectedPackages.map(id =>
          fetch(`/api/v1/package/delete/${id}`, { method: 'DELETE' })
        ));
        setPackages(packages.filter(pkg => !selectedPackages.includes(pkg._id)));
        setSelectedPackages([]);
        setSelectAll(false);
      } catch (error) {
        setError('Failed to delete packages, please try again.');
      }
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedPackages(selectAll ? [] : packages.map(pkg => pkg._id));
  };

  const handleSelect = (id) => {
    setSelectedPackages(prev => 
      prev.includes(id) ? prev.filter(pkgId => pkgId !== id) : [...prev, id]
    );
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      const newURL = page === 1 ? '/admin/packages' : `/admin/packages?page=${page}`;
      router.push(newURL); // Update URL without reloading
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
      <h2>Packages</h2>
      {selectedPackages.length > 0 && (
        <div className="action-bar">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="select-all-checkbox"
          />
          <FaTrashAlt className="action-bar-icon" onClick={handleDelete} title="Delete Selected" />
        </div>
      )}
      {error && <div className="error">{error}</div>}
      <div className="packages-table-container">
        <table className="packages-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
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
                <td colSpan="6" className="loading">Loading...</td>
              </tr>
            ) : (
              packages.map(pkg => (
                <tr key={pkg._id}>
                  <td data-label="Select">
                    <input
                      type="checkbox"
                      checked={selectedPackages.includes(pkg._id)}
                      onChange={() => handleSelect(pkg._id)}
                    />
                  </td>
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
