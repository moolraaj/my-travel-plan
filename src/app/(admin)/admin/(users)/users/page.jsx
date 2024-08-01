// /app/(admin)/admin/(users)/users/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage] = useState(4); // Number of items per page
  const totalPages = Math.ceil(totalResults / itemsPerPage); // Calculate total pages
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`/api/v1/sendquery/queries/get?page=${currentPage}&limit=${itemsPerPage}`);
        const data = await response.json();
        if (response.ok && data.status === 200) {
          setUsers(data.result);
          setTotalResults(data.totalResults); // Set totalResults from API
        } else {
          setError('Failed to fetch users');
        }
      } catch (error) {
        setError('Error fetching users');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [currentPage, itemsPerPage]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/api/v1/sendquery/query/delete/${id}`, { method: 'DELETE' });
        const data = await response.json();
        console.log('Delete response data:', data); // Log the response data for debugging
        if (response.ok && data.success) {
          setUsers(users.filter(user => user._id !== id));
          toast.success('User deleted successfully');
        } else {
          toast.error('Failed to delete user');
        }
      } catch (error) {
        toast.error('Failed to delete user, please try again.');
      }
    }
  };
  

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="packages">
      <ToastContainer />
      <h2>Users</h2>
      {error && <div className="error">{error}</div>}
      <div className="packages-table-container">
        <table className="packages-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="loading">Loading...</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id}>
                  <td data-label="ID">{user._id}</td>
                  <td data-label="Name">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Phone Number">{user.phone_number}</td>
                  <td data-label="Actions">
                    <span className="actions">
                      <FaTrashAlt className="action-icon delete" title="Delete" onClick={() => handleDelete(user._id)} />
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
    </div>
  );
}

export default UsersPage;
