// /app/(admin)/admin/(blog)/blog/create-blog/page.jsx

'use client'
import React, { useState, useEffect } from 'react';
import CategoryManagement from '../../category-management/page';
import { useRouter } from 'next/navigation';
import { handelAsyncErrors } from '@/helpers/asyncErrors';

function CreateBlog() {
    const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    blog_category: '',
    file: null,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch categories when the component mounts
    fetch('/api/v1/categories/get?page=1&limit=1000')
      .then(response => response.json())
      .then(data => setCategories(data.result))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });

     
      const response = await fetch('/api/v1/blog/add', {
        method: 'POST',
        body: form,
      });
      
      return handelAsyncErrors(async()=>{

        const result = await response.json();
        if (result.success) {
          router.push(`/admin/blog`)
        }
        else{
          setMessage(result.message);
        }
        setMessage(result.message);
       
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
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="slug">Slug:</label>
          <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="blog_category">Category:</label>
          <select id="blog_category" name="blog_category" value={formData.blog_category} onChange={handleChange} required>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="file">Image:</label>
          <input type="file" id="file" name="file" onChange={handleChange} />
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
