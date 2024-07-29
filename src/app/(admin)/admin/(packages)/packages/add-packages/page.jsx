'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddPackages = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    file: null,
    package_overview: '',
    package_top_summary: '',
    package_itinerary: '', 
    packages_include: '', 
    packages_exclude: '', 
    gallery_files: [],
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'gallery_files') {
      setFormData((prevData) => ({
        ...prevData,
        gallery_files: [...files],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files ? files[0] : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { title, description, slug, file, package_overview, package_top_summary, package_itinerary, packages_include, packages_exclude, gallery_files } = formData;

    if (!title || !description || !slug || !file) {
      setError('Please fill in all fields and upload an image.');
      setIsLoading(false);
      return;
    }

    try {
      const submissionData = new FormData();
      submissionData.append('title', title);
      submissionData.append('description', description);
      submissionData.append('slug', slug);
      submissionData.append('file', file);
      submissionData.append('package_overview', package_overview);
      submissionData.append('package_top_summary', package_top_summary);
      submissionData.append('package_itinerary', package_itinerary);
      submissionData.append('packages_include', packages_include);
      submissionData.append('packages_exclude', packages_exclude);

      gallery_files.forEach((file, index) => {
        submissionData.append('gallery_files', file);
      });

      const res = await fetch('/api/v1/package/add', {
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
    <div className="add-package">
      <h2>Add Package</h2>
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
          <label htmlFor="package_overview">Package Overview</label>
          <textarea
            id="package_overview"
            name="package_overview"
            value={formData.package_overview}
            onChange={handleChange}
            placeholder="Enter package overview"
          />
        </div>
        <div className="form-group">
          <label htmlFor="package_top_summary">Package Top Summary</label>
          <textarea
            id="package_top_summary"
            name="package_top_summary"
            value={formData.package_top_summary}
            onChange={handleChange}
            placeholder="Enter package top summary"
          />
        </div>
        <div className="form-group">
          <label htmlFor="package_itinerary">Package Itinerary</label>
          <textarea
            id="package_itinerary"
            name="package_itinerary"
            value={formData.package_itinerary}
            onChange={handleChange}
            placeholder="Enter package itinerary (JSON format)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="packages_include">Packages Include</label>
          <textarea
            id="packages_include"
            name="packages_include"
            value={formData.packages_include}
            onChange={handleChange}
            placeholder="Enter packages include (JSON format)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="packages_exclude">Packages Exclude</label>
          <textarea
            id="packages_exclude"
            name="packages_exclude"
            value={formData.packages_exclude}
            onChange={handleChange}
            placeholder="Enter packages exclude (JSON format)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Image</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
          />
          {formData.file && (
            <div className="image-preview">
              <img src={URL.createObjectURL(formData.file)} alt="Preview" />
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="gallery_files">Gallery Images</label>
          <input
            type="file"
            id="gallery_files"
            name="gallery_files"
            multiple
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Add Package'}
        </button>
      </form>
    </div>
  );
};

export default AddPackages;
