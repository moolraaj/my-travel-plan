// /app/(admin)/admin/(footer)/footer/page.jsx

'use client';
import React, { useState } from 'react';

function FooterPage() {
  const [footerData, setFooterData] = useState({
    phoneNumbers: [''],
    emailAddresses: [''],
    address: '',
    socialIcons: [{ name: '', url: '', iconUrl: '' }],
  });

  // Handle input change for fields
  const handleInputChange = (e, index, field, type) => {
    const { name, value } = e.target;

    setFooterData((prevData) => {
      if (type === 'array') {
        const updatedArray = [...prevData[field]];
        updatedArray[index] = value;
        return { ...prevData, [field]: updatedArray };
      } else if (type === 'object') {
        const updatedObjects = [...prevData[field]];
        updatedObjects[index][name] = value;
        return { ...prevData, [field]: updatedObjects };
      } else {
        return { ...prevData, [name]: value };
      }
    });
  };

  // Handle adding new fields
  const addField = (field, type) => {
    setFooterData((prevData) => {
      if (type === 'array') {
        return { ...prevData, [field]: [...prevData[field], ''] };
      } else if (type === 'object') {
        return { ...prevData, [field]: [...prevData[field], { name: '', url: '', iconUrl: '' }] };
      }
    });
  };

  // Handle removing fields
  const removeField = (field, index, type) => {
    setFooterData((prevData) => {
      if (type === 'array') {
        return { ...prevData, [field]: prevData[field].filter((_, i) => i !== index) };
      } else if (type === 'object') {
        return { ...prevData, [field]: prevData[field].filter((_, i) => i !== index) };
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("address", footerData.address);
      formData.append("phoneNumbers", JSON.stringify(footerData.phoneNumbers));
      formData.append("emailAddresses", JSON.stringify(footerData.emailAddresses));
      formData.append("socialIcons", JSON.stringify(footerData.socialIcons));

      const response = await fetch('/api/v1/footer-details/add', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result);
        // Handle success (e.g., show a message or redirect)
        alert('Content added successfully');
      } else {
        console.error(result.message);
        // Handle error (e.g., show an error message)
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
      alert('An unexpected error occurred');
    }
  };

  return (
    <div>
      <h1>Footer Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={footerData.address}
            onChange={(e) => handleInputChange(e, null, 'address')}
          />
        </div>

        <div>
          <h2>Phone Numbers:</h2>
          {footerData.phoneNumbers.map((phone, index) => (
            <div key={index}>
              <input
                type="text"
                value={phone}
                onChange={(e) => handleInputChange(e, index, 'phoneNumbers', 'array')}
              />
              <button type="button" onClick={() => removeField('phoneNumbers', index, 'array')}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addField('phoneNumbers', 'array')}>
            Add Phone Number
          </button>
        </div>

        <div>
          <h2>Email Addresses:</h2>
          {footerData.emailAddresses.map((email, index) => (
            <div key={index}>
              <input
                type="email"
                value={email}
                onChange={(e) => handleInputChange(e, index, 'emailAddresses', 'array')}
              />
              <button type="button" onClick={() => removeField('emailAddresses', index, 'array')}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addField('emailAddresses', 'array')}>
            Add Email Address
          </button>
        </div>

        <div>
          <h2>Social Icons:</h2>
          {footerData.socialIcons.map((icon, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                placeholder="Icon Name"
                value={icon.name}
                onChange={(e) => handleInputChange(e, index, 'socialIcons', 'object')}
              />
              <input
                type="text"
                name="url"
                placeholder="Link URL"
                value={icon.url}
                onChange={(e) => handleInputChange(e, index, 'socialIcons', 'object')}
              />
              <input
                type="text"
                name="iconUrl"
                placeholder="Icon Image URL"
                value={icon.iconUrl}
                onChange={(e) => handleInputChange(e, index, 'socialIcons', 'object')}
              />
              <button type="button" onClick={() => removeField('socialIcons', index, 'object')}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addField('socialIcons', 'object')}>
            Add Social Icon
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FooterPage;
