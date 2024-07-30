// /app/(admin)/admin/(continents)/continents/update-continent/[id]/page.jsx


'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function UpdateContinent({ params }) {
  const [continent, setContinent] = useState({
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
  const router = useRouter();
  const { id } = params;

  async function fetchContinent() {
    try {
      const response = await fetch(`/api/v1/continent/get/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.success) {
        setContinent({
          ...data.result,
          images: data.result.images.map(img => img.name), // Extract image names
        });
        console.log('Data:', data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error fetching continent data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContinent();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setContinent((prevContinent) => ({
          ...prevContinent,
          imageFile: file,
          imagePreviewUrl: reader.result, // Create a preview URL for the new image
        }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setContinent((prevContinent) => ({
        ...prevContinent,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', continent.title);
    formData.append('slug', continent.slug);
    formData.append('description', continent.description);
    if (continent.imageFile) {
      formData.append('file', continent.imageFile); // Upload new image
    } else {
      formData.append('file', ''); // Ensure file field is included if no new image
    }

    try {
      const response = await fetch(`/api/v1/continent/update/${id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Continent updated successfully!');
        setError('');
        setTimeout(() => router.push('/admin/continents'), 2000); // Redirect after success
      } else {
        setError(data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setError('Error updating continent.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="update-packages-container">
      <h2 className="update-packages-heading">Update Continent</h2>
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
              value={continent.title}
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
              value={continent.slug}
              onChange={handleChange}
              className="update-packages-input"
              required
            />
          </label>
          <label className="update-packages-label">
            Description:
            <textarea
              name="description"
              value={continent.description}
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
              {continent.imagePreviewUrl ? (
                <img
                  src={continent.imagePreviewUrl}
                  alt="New"
                  className="update-packages-image"
                />
              ) : (
                continent.images.map((image, index) => (
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
          <button type="submit" className="update-packages-button">Update Continent</button>
        </form>
      )}
    </div>
  );
}

export default UpdateContinent;
