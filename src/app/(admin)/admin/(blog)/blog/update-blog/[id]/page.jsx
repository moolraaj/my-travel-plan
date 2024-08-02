// /app/(admin)/admin/(blog)/blog/update-blog/[id]/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function UpdateBlog({ params }) {
  const [blogs, setBlogs] = useState({
    title: '',
    description: '',
    slug: '',
    blog_category: '',
    imageFile: null,
    imagePreviewUrl: '',
    images: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { id } = params;

 
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/v1/categories/get?page=1&limit=1000', {
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        const data = await res.json();
        setCategories(data.result || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/v1/blog/getbyid/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.success) {
            setBlogs({
            ...data.result,
            images: data.result.images.map(img => img.name), // Extract image names
          });
          console.log('Data:', data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Error fetching Blog data.');
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchCategories();
    fetchBlogs();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogs((prevBlog) => ({
          ...prevBlog,
          imageFile: file,
          imagePreviewUrl: reader.result, // Create a preview URL for the new image
        }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
        setBlogs((prevBlog) => ({
        ...prevBlog,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading

    const formData = new FormData();
    formData.append('title', blogs.title);
    formData.append('slug', blogs.slug);
    formData.append('description', blogs.description);
    formData.append('blog_category', blogs.blog_category);
    if (blogs.imageFile) {
      formData.append('file', blogs.imageFile); // Upload new image
    } else {
      formData.append('file', ''); // Ensure file field is included if no new image
    }

    try {
      const response = await fetch(`/api/v1/blog/update/${id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Blog updated successfully!');
        setError('');
        setTimeout(() => router.push('/admin/blog'), 2000); // Redirect after success
      } else {
        setError(data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setError('Error updating Blog.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="update-packages-container">
      <h2 className="update-packages-heading">Update Blog</h2>
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
              value={blogs.title}
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
              value={blogs.slug}
              onChange={handleChange}
              className="update-packages-input"
              required
            />
          </label>
          <label className="update-packages-label">
            Description:
            <textarea
              name="description"
              value={blogs.description}
              onChange={handleChange}
              className="update-packages-textarea"
              required
            />
          </label>
          <div className="form-group">
            <label htmlFor="continent">Blog Category</label>
            <select
              id="categories"
              name="categories"
              value={categories.blog_category}
              onChange={handleChange}
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <label className="update-packages-label">
            Image:
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="update-packages-file-input"
            />
            <div className="update-packages-image-preview">
              {blogs.imagePreviewUrl ? (
                <img
                  src={blogs.imagePreviewUrl}
                  alt="New"
                  className="update-packages-image"
                />
              ) : (
                blogs.images.map((image, index) => (
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
          <button type="submit" className="update-packages-button" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update blog'}
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateBlog;
