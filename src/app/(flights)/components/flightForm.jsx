'use client'
// components/EnquiryForm.js
import { useState } from 'react';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    date: '',
    origin: '',
    destination: '',
    traveler: '',
    children: '',
    question: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!formData.mobileNumber) tempErrors.mobileNumber = 'Mobile Number is required';
    if (!formData.date) tempErrors.date = 'Date is required';
    if (!formData.origin) tempErrors.origin = 'Origin is required';
    if (!formData.destination) tempErrors.destination = 'Destination is required';
    if (!formData.traveler) tempErrors.traveler = 'Traveler is required';
    if (!formData.children) tempErrors.children = 'Children is required';
    if (!formData.question) tempErrors.question = 'Question is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form data
      console.log('Form data:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form flight-form">
      <h3>Enquiry Now </h3>
      <div className="form-group">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
        />
        {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
      </div>

      <div className="form-group">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <p className="error">{errors.date}</p>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="origin"
          placeholder="Origin"
          value={formData.origin}
          onChange={handleChange}
        />
        {errors.origin && <p className="error">{errors.origin}</p>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
        />
        {errors.destination && <p className="error">{errors.destination}</p>}
      </div>

      <div className="form-group">
        <input
          type="number"
          name="traveler"
          placeholder="Traveler"
          value={formData.traveler}
          onChange={handleChange}
        />
        {errors.traveler && <p className="error">{errors.traveler}</p>}
      </div>

      <div className="form-group">
        <input
          type="number"
          name="children"
          placeholder="Children"
          value={formData.children}
          onChange={handleChange}
        />
        {errors.children && <p className="error">{errors.children}</p>}
      </div>

      <div className="form-group">
        <textarea
          name="question"
          placeholder="Ask Your Travel Consultant A Question"
          value={formData.question}
          onChange={handleChange}
        ></textarea>
        {errors.question && <p className="error">{errors.question}</p>}
      </div>

      <button type="submit" className="button">Submit</button>
    </form>
  );
};

export default EnquiryForm;
