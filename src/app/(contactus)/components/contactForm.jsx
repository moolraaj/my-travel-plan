'use client'

// components/ContactForm.js
import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted successfully', formData);
      // Handle form submission, e.g., send data to server
      // Reset form data
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <><h3>Send us Message</h3>
    <form onSubmit={handleSubmit} className="form" noValidate>
          <div className="form-group">
              <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input" />
              {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group">
              <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input" />
              {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
              <input
                  id="phone"
                  name="phone"
                  type="number"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input" />
              {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div className="form-group">
              <textarea
                  id="message"
                  name="message"
                  placeholder="Enter Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea"
              ></textarea>
              {errors.message && <p className="error">{errors.message}</p>}
          </div>

          <button type="submit" className="button">Send Message</button>
      </form></>
  );
};

export default ContactForm;
