
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


const UpdateContinent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    file: null,
    existingImage: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchContinent() {
      try {
        const response = await fetch(`/api/v1/continent/get/${id}`);
        const data = await response.json();
        if (data.success) {
          setFormData({
            title: data.result.title,
            description: data.result.description,
            slug: data.result.slug,
            file: null,
            existingImage: data.result.images[0].name,
          });
        }
      } catch (error) {
        console.error('Error fetching continent:', error);
      }
    }

    if (id) {
      fetchContinent();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.title || !formData.description || !formData.slug) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const submissionData = new FormData();
      submissionData.append('title', formData.title);
      submissionData.append('description', formData.description);
      submissionData.append('slug', formData.slug);
      if (formData.file) {
        submissionData.append('file', formData.file);
      }

      const res = await fetch(`/api/v1/continent/update/${id}`, {
        method: 'POST',
        body: submissionData,
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/packages');
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (error) {
      setError('An error occurred while submitting the form.');
    }

    setIsLoading(false);
  };

  return (
    <div className="update-continent">
      <h2>Update Continent</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Enter slug"
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Image</label>
          <input type="file" id="file" name="file" onChange={handleChange} />
          {formData.existingImage && !formData.file && (
            <div className="image-preview">
              <img src={`/uploads/${formData.existingImage}`} alt="Existing Preview" />
            </div>
          )}
          {formData.file && (
            <div className="image-preview">
              <img src={URL.createObjectURL(formData.file)} alt="New Preview" />
            </div>
          )}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Continent'}
        </button>
      </form>
    </div>
  );
};

export default UpdateContinent;
