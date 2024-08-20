// components/FooterLinks.js
'use client';
import React, { useEffect, useState } from 'react';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import Link from 'next/link';


const FooterLinks = () => {

  const [footerData, setFooterData] = useState(null);

  const fetchFooterData = async () => {
    const api = EXPORT_ALL_APIS();
    const data = await api.loadFooterDeatails();
    setFooterData(data.result[0][0]);
  };

  useEffect(() => {
    fetchFooterData();
  }, []);

  return (
    <div className="footer-links-container">
      <div className="other-links">
        <h3 className="footer-title">Other Links</h3>
        <ul className="footer-list">
          <li className="footer-item"><Link href={`/privacy-policy`}>Privacy Policy</Link></li>
          <li className="footer-item"><Link href={`/terms&conditions`}>Terms of Service</Link></li>
          <li className="footer-item"><Link href={`/disclaimer`}>Disclaimer</Link></li>
        </ul>
      </div>
      {footerData?.socialIcons === null && footerData?.socialIcons === undefined ? (
        ''
      ) : (
        <div className="follow-us">
          <h3 className="footer-title">Follow Us :</h3>
          <div className="social-icons">
            {footerData?.socialIcons.map((icon, index) => (
              <Link key={index} href={icon.url} target="_blank" rel="noopener noreferrer" className="social-icon">
                <img src={icon.iconUrl} alt={icon.name} />
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default FooterLinks;
