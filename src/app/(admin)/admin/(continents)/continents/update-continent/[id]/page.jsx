// /app/(admin)/admin/(continents)/continents/update-continent/[id]/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function UpdateContinent({ params }) {
  const [continent, setContinent] = useState({
    title: '',
    slug: '',
    description: '',
    image: '', // This will hold the URL/path of the current image
    imageFile: null, // This will hold the new image file
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const { id } = params; // Get the ID from URL parameters

  useEffect(() => {
    async function fetchContinent() {
      try {
        const response = await fetch(`/api/v1/continent/get/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.success) {
          setContinent(data.result);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Error fetching continent data.');
      } finally {
        setLoading(false);
      }
    }

    fetchContinent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setContinent((prevContinent) => ({
        ...prevContinent,
        imageFile: files[0], // Store the file for upload
      }));
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
            {continent.image && (
              <div className="update-packages-image-preview">
                <img src={`/uploads/${continent.image}`} alt="Current" className="update-packages-image" />
              </div>
            )}
          </label>
          <button type="submit" className="update-packages-button">Update Continent</button>
        </form>
      )}
    </div>
  );
}

export default UpdateContinent;


