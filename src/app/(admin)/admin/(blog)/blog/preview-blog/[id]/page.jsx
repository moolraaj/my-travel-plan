// /app/(admin)/admin/(blog)/blog/preview-blog/[id]\page.jsx

'use client';

import { handelAsyncErrors } from '@/helpers/asyncErrors';
import React, { useEffect, useState } from 'react'

function PreviewBlog({params}) {
    const { id } = params;
    const [blogs, setBlogs] = useState({
        title: '',
        description: '',
        slug: '',
        blog_category: '',
        file: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    async function fetchBlogs() {
      return handelAsyncErrors(async()=>{
        const response = await fetch(`/api/v1/blog/getbyid/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.success) {
            setBlogs(data.result);
        } else {
          setError(data.message);
        }
        setLoading(false);
      })
    }
  
    useEffect(() => {
      fetchBlogs();
    }, [id]);
  
    return (
      <div className="preview-continent-container">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <>
            <h2><strong>Blogs Name:</strong> {blogs.title}</h2>
            <p><strong>Blogs Description:</strong> {blogs.description}</p>
            <p><strong>Slug:</strong> {blogs.slug}</p>
            <div className="preview-continent-images">
              {blogs.images.length > 0 ? (
                blogs.images.map((image, index) => (
                  <img
                    key={index}
                    src={`/uploads/${image.name}`}
                    alt={image.name}
                    className="preview-continent-image"
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className="preview-continent-countries">
              <h3>Category: {blogs.category?.name || "N/A"}</h3>
            </div>
          </>
        )}
      </div>
    );
  }
export default PreviewBlog