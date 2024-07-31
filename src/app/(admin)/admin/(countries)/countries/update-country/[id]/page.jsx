// /app/(admin)/admin/(countries)/countries/update-country/[id]/page.jsx


'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function UpdateCountry({ params }) {
  const [country, setCountry] = useState({
    title: '',
    slug: '',
    description: '',
    images: [], // This will hold the current image list
    imageFile: null, // This will hold the new image file
    imagePreviewUrl: '', // This will hold the preview URL of the new image
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const router = useRouter();
  const { id } = params;

  async function fetchCountry() {
    try {
      const response = await fetch(`/api/v1/country/get/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.success) {
        setCountry({
          ...data.result,
          images: data.result.images.map(img => img.name), // Extract image names
        });
        console.log('Data:', data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error fetching Country data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCountry();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCountry((prevCountry) => ({
          ...prevCountry,
          imageFile: file,
          imagePreviewUrl: reader.result, // Create a preview URL for the new image
        }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setCountry((prevCountry) => ({
        ...prevCountry,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading
    const formData = new FormData();
    formData.append('title', country.title);
    formData.append('slug', country.slug);
    formData.append('description', country.description);
    if (country.imageFile) {
      formData.append('file', country.imageFile); // Upload new image
    } else {
      formData.append('file', ''); // Ensure file field is included if no new image
    }

    try {
      const response = await fetch(`/api/v1/country/update/${id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMessage('country updated successfully!');
        setError('');
        setTimeout(() => router.push('/admin/countries'), 2000); // Redirect after success
      } else {
        setError(data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setError('Error updating country.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="update-packages-container">
      <h2 className="update-packages-heading">Update Country</h2>
      {loading && <p className="update-packages-loading">Loading...</p>}
      {error && <p className="update-packages-error">{error}</p>}
      {successMessage && <p className="update-packages-success">{successMessage}</p>}
      {!loading && (
        <form className="update-packages-form" onSubmit={handleSubmit}>
          <label className="update-packages-label">
            Title:
            <input
              type="text"
              name="title"
              value={country.title}
              onChange={handleChange}
              className="update-packages-input"
              required
            />
          </label>
          <label className="update-packages-label">
            Slug:
            <input
              type="text"
              name="slug"
              value={country.slug}
              onChange={handleChange}
              className="update-packages-input"
              required
            />
          </label>
          <label className="update-packages-label">
            Description:
            <textarea
              name="description"
              value={country.description}
              onChange={handleChange}
              className="update-packages-textarea"
              required
            />
          </label>
          <label className="update-packages-label">
            Image:
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="update-packages-file-input"
            />
            <div className="update-packages-image-preview">
              {country.imagePreviewUrl ? (
                <img
                  src={country.imagePreviewUrl}
                  alt="New"
                  className="update-packages-image"
                />
              ) : (
                country.images.map((image, index) => (
                  <img
                    key={index}
                    src={`/uploads/${image}`}
                    alt={`Current ${image}`}
                    className="update-packages-image"
                  />
                ))
              )}
            </div>
          </label>
          <button type="submit" className="update-packages-button"  disabled={isLoading} >
            {isLoading ? 'Updating...' : 'Update Country'} 
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateCountry;

