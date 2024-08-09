// src/Components/(bookings)/_bookings/bookingForm.jsx;

'use client'

import FormLoader from '@/app/_common/loader/loader';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import { useState } from 'react';
import { toast } from 'react-toastify';

function BookingForm ({setOpenBookingForm}){
  let api = EXPORT_ALL_APIS();
  const [bookings, setBookings] = useState({
    name: '',
    email: '',
    phone_number: '',
    date: '',
    origin: '',
    destination: '',
    traveler: '',
    children: '',
    message: '',
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookings({
      ...bookings,
      [name]: value,
    });
    setError({
      ...error,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate bookings inputs
    let formData = new FormData();
    formData.append('name', bookings.name);
    formData.append('email', bookings.email);
    formData.append('phone_number',Number(bookings.phone_number));
    formData.append('date', bookings.date);
    formData.append('origin', bookings.origin);
    formData.append('destination', bookings.destination);
    formData.append('traveler', bookings.traveler);
    formData.append('children', bookings.children);
    formData.append('message', bookings.message);
    formData.append('form_unit_tag', 'flight_unit_tag_8520');

    try {
      setLoading(true); // Start loading state

      const resp = await api.sendQueryBookings(formData);

      if (resp.success) {
        toast.success(resp.message);
        setBookings({
          name: '',
          email: '',
          phone_number: '',
          date: '',
          origin: '',
          destination: '',
          traveler: '',
          children: '',
          message: '',
        });
      } else {
        setError(resp.errors);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('There was an error submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  const closeForm=()=>{
    setOpenBookingForm(false)
  }

  return (
    <>
    <div className="booking_form_outer">
    <div className="booking_form_inner">
    
      <h3>Book your package</h3>
      <form onSubmit={handleSubmit} className="form" noValidate>
      <button className="close-button" onClick={closeForm}>×</button>
      <div className="booking_input-group_wrapper">
        <div className="booking_input-group">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Your Name"
            value={bookings.name}
            onChange={handleChange}
            className="input"
          />
          <span className='error_field'>{error.name}</span>
        </div>

        <div className="booking_input-group">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Your Email"
            value={bookings.email}
            onChange={handleChange}
            className="input"
          />
          <span className='error_field'>{error.email}</span>
        </div>

        <div className="booking_input-group">
          <input
            id="phone"
            name="phone_number"
            type="number"
            placeholder="Phone Number"
            value={bookings.phone_number}
            onChange={handleChange}
            className="input"
          />
          <span className='error_field'>{error.phone_number}</span>
        </div>

        <div className="booking_input-group">
          <input
            id="date"
            name="date"
            type="date"
            placeholder="Travel Date"
            value={bookings.date}
            onChange={handleChange}
            className="input"
          />
          <span className='error_field'>{error.date}</span>
        </div>

        <div className="booking_input-group">
          <input
            id="origin"
            name="origin"
            type="text"
            placeholder="Origin"
            value={bookings.origin}
            onChange={handleChange}
            className="input"
          />
          <span className='error_field'>{error.origin}</span>
        </div>

        <div className="booking_input-group">
          <input
            id="destination"
            name="destination"
            type="text"
            placeholder="Destination"
            value={bookings.destination}
            onChange={handleChange}
            className="input"
          />
          <span className='error_field'>{error.destination}</span>
        </div>

        <div className="booking_input-group">
          <input
            id="traveler"
            name="traveler"
            type="number"
            placeholder="Number of Travelers"
            value={bookings.traveler}
            onChange={handleChange}
            className="input"
          />
          <span className='error_field'>{error.traveler}</span>
        </div>

        <div className="booking_input-group">
          <input
            id="children"
            name="children"
            type="number"
            placeholder="Number of Children"
            value={bookings.children}
            onChange={handleChange}
            className="input"
          />
          <span className='error_field'>{error.children}</span>
        </div>

        <div className="booking_input-group">
          <textarea
            id="message"
            name="message"
            placeholder="Enter Your Message"
            value={bookings.message}
            onChange={handleChange}
            className="textarea"
          ></textarea>
          <span className='error_field'>{error.message}</span>
        </div>
        </div>
        <button type="submit" className="button">
          {loading ? <FormLoader /> : 'Book'}
        </button>
      </form>
      </div>
      </div>
    </>
  );
};

export default BookingForm;
