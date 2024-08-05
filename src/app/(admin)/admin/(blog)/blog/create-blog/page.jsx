// /app/(admin)/admin/(blog)/blog/create-blog/page.jsx


'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handelAsyncErrors } from '@/helpers/asyncErrors';
import CategoryManagement from '../../category-management/page';

function CreateBlog() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    blog_category: '',
    blog_overview: '',
    blog_description: [{ description: '' }],
    file: null,
    gallery_files: []
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/v1/categories/get?page=1&limit=1000')
      .then(response => response.json())
      .then(data => setCategories(data.result))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'gallery_files') {
      setFormData(prev => ({
        ...prev,
        [name]: Array.from(files),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'file' ? files[0] : value,
      }));
    }
  };

  const handleDescriptionChange = (index, e) => {
    const { value } = e.target;
    const updatedDescriptions = [...formData.blog_description];
    updatedDescriptions[index].description = value;
    setFormData(prev => ({
      ...prev,
      blog_description: updatedDescriptions
    }));
  };

  const addDescriptionField = () => {
    setFormData(prev => ({
      ...prev,
      blog_description: [...prev.blog_description, { description: '' }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach(key => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach(item => {
          if (typeof item === 'object' && item !== null && item.constructor === Object) {
            Object.keys(item).forEach(subKey => {
              form.append(`${key}[${subKey}]`, item[subKey]);
            });
          } else {
            form.append(key, item);
          }
        });
      } else {
        form.append(key, formData[key]);
      }
    });

    return handelAsyncErrors (async()=>{
      const response = await fetch('/api/v1/blog/add', {
        method: 'POST',
        body: form,
      });

      const result = await response.json();
      if (result.success) {
        router.push('/admin/blog');
      } else {
        setMessage(result.message || 'An error occurred while creating the blog.');
      }
    })
    
  };

  return (
    <>
      <h2>Add Blog</h2>
      <div className="blog_cat_wrapper">
        <div className="add_blog">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="slug">Slug:</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="blog_category">Category:</label>
              <select
                id="blog_category"
                name="blog_category"
                value={formData.blog_category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="blog_overview">Blog Overview:</label>
              <textarea
                id="blog_overview"
                name="blog_overview"
                value={formData.blog_overview}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Blog Description:</label>
              {formData.blog_description.map((desc, index) => (
                <div key={index}>
                  <textarea
                    name={`description_${index}`}
                    placeholder="Description"
                    value={desc.description}
                    onChange={(e) => handleDescriptionChange(index, e)}
                    required
                  />
                </div>
              ))}
              <button type="button" onClick={addDescriptionField}>Add More</button>
            </div>
            <div>
              <label htmlFor="file">Main Image:</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="gallery_files">Gallery Images:</label>
              <input
                type="file"
                id="gallery_files"
                name="gallery_files"
                multiple
                onChange={handleChange}
              />
            </div>
            <button type="submit">Add Blog</button>
          </form>
        </div>
        <div className="add_cats">
          <CategoryManagement/>
        </div>
      </div>
      {message && <p>{message}</p>}
    </>
  );
}

export default CreateBlog;
