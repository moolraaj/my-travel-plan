
// // /app/(admin)/admin/(countries)/countries/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';

function CountryPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage] = useState(4); // Number of items per page
  const totalPages = Math.ceil(totalResults / itemsPerPage); // Calculate total pages
  const router = useRouter();
  const searchParams = useSearchParams(); // To access query parameters

  useEffect(() => {
    // Read page number from URL if present
    const pageFromURL = parseInt(searchParams.get('page')) || 1;
    setCurrentPage(pageFromURL);

    async function fetchCountries() {
      try {
        const response = await fetch(`/api/v1/countries/get?page=${pageFromURL}&limit=${itemsPerPage}`);
        const data = await response.json();
        if (data.success) {
          setCountries(data.result);
          setTotalResults(data.totalResults); // Set totalResults from API
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, [searchParams, itemsPerPage]);

  const handleAddClick = () => {
    router.push('/admin/countries/add-country');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete the selected countries?')) {
      try {
        for (const id of selectedCountries) {
          await fetch(`/api/v1/country/delete/${id}`, { method: 'DELETE' });
        }
        setCountries(countries.filter(country => !selectedCountries.includes(country._id)));
        setSelectedCountries([]);
        setSelectAll(false);
      } catch (error) {
        setError('Failed to delete countries, please try again.');
      }
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedCountries(countries.map(country => country._id));
    } else {
      setSelectedCountries([]);
    }
  };

  const handleSelect = (id) => {
    if (selectedCountries.includes(id)) {
      setSelectedCountries(selectedCountries.filter(countryId => countryId !== id));
    } else {
      setSelectedCountries([...selectedCountries, id]);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      const newURL = page === 1 ? '/admin/countries' : `/admin/countries?page=${page}`;
      router.push(newURL); // Update URL without reloading
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/countries/update-country/${id}`);
  };

  const handlePreview = (id) => {
    router.push(`/admin/countries/preview-country/${id}`);
  };

  return (
    <div className="packages">
      <h2>Countries</h2>
      {selectedCountries.length > 0 && (
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
              <th>Cities Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="loading">Loading...</td>
              </tr>
            ) : (
              countries.map(country => (
                <tr key={country._id}>
                  <td data-label="Select">
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(country._id)}
                      onChange={() => handleSelect(country._id)}
                    />
                  </td>
                  <td data-label="Image">
                    <img 
                      src={`/uploads/${country.images[0].name}`} 
                      alt={country.title} 
                      className="package-image" 
                    />
                  </td>
                  <td data-label="ID">{country._id}</td>
                  <td data-label="Title">{country.title}</td>
                  <td data-label="Description">{country.description}</td>
                  <td data-label="Cities Count">{country.cities ? country.cities.length : 0}</td>
                  <td data-label="Actions">
                    <span className="actions">
                      <FaEye className="action-icon view" title="View" onClick={() => handlePreview(country._id)} />
                      <FaEdit className="action-icon edit" title="Edit" onClick={() => handleEdit(country._id)} />
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
        <div className="tooltip">Add Country</div>
      </div>
    </div>
  );
}

export default CountryPage;
