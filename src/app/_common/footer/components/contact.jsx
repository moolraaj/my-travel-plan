// components/contactLinks.js
'use client';
import React, { useEffect, useState } from 'react';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';

const ContactLinks = () => {
  const [footerData, setFooterData] = useState(null);
 
  const fetchFooterData = async () => {
    const api = EXPORT_ALL_APIS();
    const data = await api.loadFooterDeatails();
    setFooterData(data.result[0][0]);
  };

  useEffect(() => {
    fetchFooterData();
  }, []);

  if (!footerData) return <p>No footer data available</p>;

  return (
    <>
    {footerData===null && footerData===undefined ? (
      ''
    ):(
      <div className="contact-links-container">
      <div className="other-links">
        <h3 className="contact-title">Contact Us</h3>
        <ul className="contact-list">
          {footerData.phoneNumbers===null && footerData.phoneNumbers===undefined ?(''):(footerData.phoneNumbers.map((phone, index) => (
            <li className="contact-item" key={index}>
              <a href={`tel:${phone}`}>{phone}</a>
            </li>
          )))}
          {footerData.emailAddresses===null && footerData.emailAddresses===undefined ?(''):(footerData.emailAddresses.map((email, index) => (
            <li className="contact-item" key={index}>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          )))}
        </ul>
      </div>
      <div className="address-us">
        <h3 className="contact-title">Address Us:</h3>
        <div className="address-description">
          <p>{footerData.address || ''}</p>
        </div>
      </div>
    </div>
    )}
    </>
  );
};


export default ContactLinks;
