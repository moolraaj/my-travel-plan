// components/contactLinks.js
'use client';
import React, { useEffect, useState } from 'react';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';

const ContactLinks = () => {
  const [footerData, setFooterData] = useState(null);

  const fetchFooterData = async () => {
    try {
      const api = EXPORT_ALL_APIS();
      const data = await api.loadFooterDeatails();
  
      if (data && data.result && data.result.length > 0 && data.result[0].length > 0) {
        setFooterData(data.result[0][0]);
      } else {
        setFooterData(null);
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
      setFooterData(null);
    }
  };
  
  useEffect(() => {
    fetchFooterData();
  }, []);

  if (!footerData) return <p>No footer data available</p>;

  return (
    <div className="contact-links-container">
      <div className="other-links">
        <h3 className="contact-title">Contact Us</h3>
        <ul className="contact-list">
          {footerData.phoneNumbers?.length ? (
            footerData.phoneNumbers.map((phone, index) => (
              <li className="contact-item" key={index}>
                <a href={`tel:${phone}`}>{phone}</a>
              </li>
            ))
          ) : (
            <li>No phone numbers available</li>
          )}
          {footerData.emailAddresses?.length ? (
            footerData.emailAddresses.map((email, index) => (
              <li className="contact-item" key={index}>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            ))
          ) : (
            <li>No email addresses available</li>
          )}
        </ul>
      </div>
      <div className="address-us">
        <h3 className="contact-title">Address Us:</h3>
        <div className="address-description">
          <p>{footerData.address || 'No address available'}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactLinks;

