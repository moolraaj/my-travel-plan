// /app/(admin)/admin/(continents)/continent/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify'; // Import toast functions
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

function ContinentPage() {
  const [continents, setContinents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [actionBarVisible, setActionBarVisible] = useState(true); // State for action bar visibility
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage] = useState(4); // Number of items per page
  const totalPages = Math.ceil(totalResults / itemsPerPage); // Calculate total pages
  const router = useRouter();

  useEffect(() => {
    async function fetchContinents() {
      try {
        const response = await fetch(`/api/v1/continents/get?page=${currentPage}&limit=${itemsPerPage}`);
        const data = await response.json();
        if (data.success) {
          setContinents(data.result);
          setTotalResults(data.totalResults); // Set totalResults from API
        } else {
          toast.error(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error fetching continents:', error);
        toast.error('Error fetching continents. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchContinents();
  }, [currentPage]);

  const handleAddClick = () => {
    router.push('/admin/continents/add-continent');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete the selected continents?')) {
      try {
        for (const id of selectedContinents) {
          const continent = continents.find(cont => cont._id === id);
          if (continent.countries && continent.countries.length > 0) {
            toast.error(`Continent ${continent.title} has associated countries and cannot be deleted.`);
            setTimeout(() => {
              setActionBarVisible(false);
              setSelectedContinents([]);
            }, 3000);
            return; // Exit the function to prevent further processing
          }
          // Add similar checks for cities and packages if necessary
          const response = await fetch(`/api/v1/continent/delete/${id}`, { method: 'DELETE' });
          const data = await response.json();
          if (!data.success) {
            toast.error(data.message);
            setActionBarVisible(false);
            setTimeout(() => {
              setActionBarVisible(true);
              setSelectedContinents([]);
            }, 3000);
            return;
          }
        }
        setContinents(continents.filter(continent => !selectedContinents.includes(continent._id)));
        setSelectedContinents([]);
        setSelectAll(false);
        toast.success('Selected continents have been deleted successfully.');
      } catch (error) {
        console.error('Error deleting continents:', error);
        toast.error('Error deleting continents. Please try again later.');
        setActionBarVisible(false);
        setTimeout(() => {
          setActionBarVisible(true);
          setSelectedContinents([]);
        }, 3000);
      }
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedContinents(continents.map(continent => continent._id));
    } else {
      setSelectedContinents([]);
    }
  };

  const handleSelect = (id) => {
    if (selectedContinents.includes(id)) {
      setSelectedContinents(selectedContinents.filter(continentId => continentId !== id));
    } else {
      setSelectedContinents([...selectedContinents, id]);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/continents/update-continent/${id}`);
  };

  const handlePreview = (id) => {
    router.push(`/admin/continents/preview-continent/${id}`);
  };

  return (
    <div className="packages">
      <ToastContainer />
      <h2>Continents</h2>
      {selectedContinents.length > 0 && actionBarVisible && (
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
              <th>Countries Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="loading">Loading...</td>
              </tr>
            ) : (
              continents.map(continent => (
                <tr key={continent._id}>
                  <td data-label="Select">
                    <input
                      type="checkbox"
                      checked={selectedContinents.includes(continent._id)}
                      onChange={() => handleSelect(continent._id)}
                    />
                  </td>
                  <td data-label="Image">
                    <img
                      src={`/uploads/${continent.images[0].name}`}
                      alt={continent.title}
                      className="package-image"
                    />
                  </td>
                  <td data-label="ID">{continent._id}</td>
                  <td data-label="Title">{continent.title}</td>
                  <td data-label="Description">{continent.description}</td>
                  <td data-label="Countries Count">{continent.countries ? continent.countries.length : 0}</td>
                  <td data-label="Actions">
                    <span className="actions">
                      <FaEye className="action-icon view" title="View" onClick={() => handlePreview(continent._id)} />
                      <FaEdit className="action-icon edit" title="Edit" onClick={() => handleEdit(continent._id)} />
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
        <div className="tooltip">Add Continent</div>
      </div>
    </div>
  );
}

export default ContinentPage;
