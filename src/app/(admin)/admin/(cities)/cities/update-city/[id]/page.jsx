// /app/(admin)/admin/(cities)/cities/update-city/[id]/page.jsx


'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function UpdateCity({ params }) {
  const [city, setCity] = useState({
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

  async function fetchCity() {
    try {
      const response = await fetch(`/api/v1/city/getbyid/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.success) {
        setCity({
          ...data.result,
          images: data.result.images.map(img => img.name), // Extract image names
        });
        console.log('Data:', data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error fetching City data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCity();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCity((prevCity) => ({
          ...prevCity,
          imageFile: file,
          imagePreviewUrl: reader.result, // Create a preview URL for the new image
        }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setCity((prevCity) => ({
        ...prevCity,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading
    const formData = new FormData();
    formData.append('title', city.title);
    formData.append('slug', city.slug);
    formData.append('description', city.description);
    if (city.imageFile) {
      formData.append('file', city.imageFile); // Upload new image
    } else {
      formData.append('file', ''); // Ensure file field is included if no new image
    }

    try {
      const response = await fetch(`/api/v1/city/update/${id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMessage('City updated successfully!');
        setError('');
        setTimeout(() => router.push('/admin/cities'), 2000); // Redirect after success
      } else {
        setError(data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setError('Error updating City.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="update-packages-container">
      <h2 className="update-packages-heading">Update City</h2>
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
              value={city.title}
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
              value={city.slug}
              onChange={handleChange}
              className="update-packages-input"
              required
            />
          </label>
          <label className="update-packages-label">
            Description:
            <textarea
              name="description"
              value={city.description}
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
              {city.imagePreviewUrl ? (
                <img
                  src={city.imagePreviewUrl}
                  alt="New"
                  className="update-packages-image"
                />
              ) : (
                city.images.map((image, index) => (
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
            {isLoading ? 'Updating...' : 'Update City'} 
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateCity;

