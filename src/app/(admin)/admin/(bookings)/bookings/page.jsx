// /app/(admin)/admin/(bookings)/bookings/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalWrapper from '@/app/(admin)/_common/modal/modal';


function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage] = useState(4); // Number of items per page
  const totalPages = Math.ceil(totalResults / itemsPerPage); // Calculate total pages
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);


  async function fetchBookings() {
    try {
      const response = await fetch(`/api/v1/flight/queries/get?page=${currentPage}&limit=${itemsPerPage}`);
      const data = await response.json();
      if (response.ok && data.status === 200) {
        setBookings(data.result);
        setTotalResults(data.totalResults); // Set totalResults from API
      } else {
        setError('Failed to fetch bookings');
      }
    } catch (error) {
      setError('Error fetching bookings');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, [currentPage, itemsPerPage]);

  const confirmDelete = async () => {
    
      try {
        const response = await fetch(`/api/v1/flight/query/delete/${deleteItem}`, { method: 'DELETE' });
        const data = await response.json();
        if (response.ok && data.status === 200 && data.success) {
          fetchBookings();
          toast.success('Booking deleted successfully');
          setIsOpen(false)
        } else {
          toast.error(data.message || 'Failed to delete booking');
        }
      } catch (error) {
        toast.error('Failed to delete booking, please try again.');
      }
    
  };

  const handleDelete = (id) => {
    setIsOpen(true)
    setDeleteItem(id)
  }

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="packages">
      <ModalWrapper
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
      />
      <ToastContainer />
      <h2>Bookings</h2>
      {error && <div className="error">{error}</div>}
      <div className="packages-table-container">
        <table className="packages-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Traveler</th>
              <th>Children</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" className="loading">Loading...</td>
              </tr>
            ) : (
              bookings.map(booking => (
                <tr key={booking._id}>
                  <td data-label="Booking ID">{booking._id}</td>
                  <td data-label="Name">{booking.name}</td>
                  <td data-label="Email">{booking.email}</td>
                  <td data-label="Phone Number">{booking.phone_number}</td>
                  <td data-label="Date">{booking.date}</td>
                  <td data-label="Origin">{booking.origin}</td>
                  <td data-label="Destination">{booking.destination}</td>
                  <td data-label="Traveler">{booking.traveler}</td>
                  <td data-label="Children">{booking.children}</td>
                  <td data-label="Message">{booking.message}</td>
                  <td data-label="Actions">
                    <span className="actions">
                      <FaTrashAlt
                        className="action-icon delete"
                        title="Delete"
                        onClick={() => handleDelete(booking._id)}
                      />
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

export default BookingPage;

