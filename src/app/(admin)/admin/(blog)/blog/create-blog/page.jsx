
// // /app/(admin)/admin/(blog)/blog/create-blog/page.jsx

// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import CategoryManagement from '../../category-management/page';

// function CreateBlog() {
//   const router = useRouter();
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     slug: '',
//     blog_category: '',
//     blog_overview: '',
//     blog_description: [{ description: '' }],
//     file: null,
//     gallery_files: []
//   });
//   const [imagePreviewUrl, setImagePreviewUrl] = useState('');
//   const [galleryPreviews, setGalleryPreviews] = useState([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetch('/api/v1/categories/get?page=1&limit=1000')
//       .then(response => response.json())
//       .then(data => setCategories(data.result))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === 'file') {
//       const file = files[0];
//       setFormData(prev => ({ ...prev, file }));

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreviewUrl(reader.result);
//       };
//       if (file) {
//         reader.readAsDataURL(file);
//       }
//     } else if (name === 'gallery_files') {
//       const filesArray = Array.from(files);
//       setFormData(prev => ({ ...prev, gallery_files: filesArray }));

//       const previews = [];
//       filesArray.forEach(file => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           previews.push(reader.result);
//           if (previews.length === filesArray.length) {
//             setGalleryPreviews(previews);
//           }
//         };
//         if (file) {
//           reader.readAsDataURL(file);
//         }
//       });
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleDescriptionChange = (index, e) => {
//     const { value } = e.target;
//     const updatedDescriptions = [...formData.blog_description];
//     updatedDescriptions[index].description = value;
//     setFormData(prev => ({
//       ...prev,
//       blog_description: updatedDescriptions
//     }));
//   };

//   const addDescriptionField = () => {
//     setFormData(prev => ({
//       ...prev,
//       blog_description: [...prev.blog_description, { description: '' }]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     Object.keys(formData).forEach(key => {
//       if (Array.isArray(formData[key])) {
//         formData[key].forEach(item => {
//           if (typeof item === 'object' && item !== null && item.constructor === Object) {
//             Object.keys(item).forEach(subKey => {
//               form.append(`${key}[${subKey}]`, item[subKey]);
//             });
//           } else {
//             form.append(key, item);
//           }
//         });
//       } else {
//         form.append(key, formData[key]);
//       }
//     });

//     try {
//       const response = await fetch('/api/v1/blog/add', {
//         method: 'POST',
//         body: form,
//       });

//       const result = await response.json();
//       if (result.success) {
//         router.push('/admin/blog');
//       } else {
//         setMessage(result.message || 'An error occurred while creating the blog.');
//       }
//     } catch (error) {
//       console.error('Error during form submission:', error);
//       setMessage('An unexpected error occurred.');
//     }
//   };

//   return (
//     <>
//       <h2>Add Blog</h2>
//       <div className="blog_cat_wrapper">
//         <div className="add_blog">
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="title">Title:</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="description">Description:</label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="slug">Slug:</label>
//               <input
//                 type="text"
//                 id="slug"
//                 name="slug"
//                 value={formData.slug}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="blog_category">Category:</label>
//               <select
//                 id="blog_category"
//                 name="blog_category"
//                 value={formData.blog_category}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select a category</option>
//                 {categories.map(category => (
//                   <option key={category._id} value={category._id}>{category.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label htmlFor="blog_overview">Blog Overview:</label>
//               <textarea
//                 id="blog_overview"
//                 name="blog_overview"
//                 value={formData.blog_overview}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <label>Blog Description:</label>
//               {formData.blog_description.map((desc, index) => (
//                 <div key={index}>
//                   <textarea
//                     name={`description_${index}`}
//                     placeholder="Description"
//                     value={desc.description}
//                     onChange={(e) => handleDescriptionChange(index, e)}
//                     required
//                   />
//                 </div>
//               ))}
//               <button type="button" onClick={addDescriptionField}>Add More</button>
//             </div>
//             <div>
//               <label htmlFor="file">Main Image:</label>
//               <input
//                 type="file"
//                 id="file"
//                 name="file"
//                 onChange={handleChange}
//               />
//               {imagePreviewUrl && (
//                 <img src={imagePreviewUrl} alt="Main Image Preview" width="100" />
//               )}
//             </div>
//             <div>
//               <label htmlFor="gallery_files">Gallery Images:</label>
//               <input
//                 type="file"
//                 id="gallery_files"
//                 name="gallery_files"
//                 multiple
//                 onChange={handleChange}
//               />
//               {galleryPreviews.length > 0 && (
//                 <div className="gallery-previews">
//                   {galleryPreviews.map((preview, index) => (
//                     <img key={index} src={preview} alt={`Gallery Image Preview ${index + 1}`} width="100" />
//                   ))}
//                 </div>
//               )}
//             </div>
//             <button type="submit">Add Blog</button>
//           </form>
//         </div>
//         <div className="add_cats">
//           <CategoryManagement />
//         </div>
//       </div>
//       {message && <p>{message}</p>}
//     </>
//   );
// }

// export default CreateBlog;




// /app/(admin)/admin/(blog)/blog/create-blog/page.jsx

'use client';
import React, { useState, useEffect } from 'react';
import { FaMinus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handelAsyncErrors } from '@/helpers/asyncErrors';
import CategoryManagement from '../../category-management/page';

const CreateBlog = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    blog_category: '',
    blog_overview: '',
    blog_description: [{ content: '' }],
    file: null,
    gallery_files: []
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    return handelAsyncErrors(async () => {
      const res = await fetch('/api/v1/categories/get?page=1&limit=1000');
      const data = await res.json();
      if (data.success) {
        setCategories(data.result);
      } else {
        toast.error('Failed to fetch categories');
      }
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleDynamicChange = (e, index, field) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedField = [...prevData[field]];
      updatedField[index][name] = value;
      return { ...prevData, [field]: updatedField };
    });
  };

  const handleAddField = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], { content: '' }]
    }));
  };

  const handleRemoveField = (index, field) => {
    setFormData((prevData) => {
      const updatedField = [...prevData[field]];
      updatedField.splice(index, 1);
      return { ...prevData, [field]: updatedField };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const {
      title,
      description,
      slug,
      blog_category,
      blog_overview,
      blog_description,
      file,
      gallery_files
    } = formData;

    if (!title || !description || !slug || !file || !blog_category) {
      toast.error('Please fill in all required fields and upload an image.');
      setIsLoading(false);
      return;
    }

    return handelAsyncErrors(async () => {
      const submissionData = new FormData();
      submissionData.append('title', title);
      submissionData.append('description', description);
      submissionData.append('slug', slug);
      submissionData.append('blog_category', blog_category);
      submissionData.append('blog_overview', blog_overview);
      submissionData.append('blog_description', JSON.stringify(blog_description));
      submissionData.append('file', file);
      gallery_files.forEach((file) => {
        submissionData.append('gallery_files', file);
      });

      const res = await fetch('/api/v1/blog/add', {
        method: 'POST',
        body: submissionData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Blog created successfully!');
        router.push('/admin/blog');
      } else {
        setError(data.message || 'An error occurred.');
        toast.error(data.message || 'An error occurred.');
      }
      setIsLoading(false);
    });
  };

  return (
    <>
      <ToastContainer />
      <h2>Create Blog</h2>
      <div className="blog_cat_wrapper">
        <div className="add_blog">
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
              <label htmlFor="blog_category">Category</label>
              <select
                id="blog_category"
                name="blog_category"
                value={formData.blog_category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="blog_overview">Blog Overview</label>
              <textarea
                id="blog_overview"
                name="blog_overview"
                value={formData.blog_overview}
                onChange={handleChange}
                placeholder="Enter blog overview"
              />
            </div>
            <div className="form-group">
              <label>Blog Description</label>
              {formData.blog_description.map((item, index) => (
                <div key={index} className="description-item">
                  <textarea
                    name="content"
                    value={item.content}
                    onChange={(e) => handleDynamicChange(e, index, 'blog_description')}
                    placeholder="Description content"
                  />
                  <div className="remove-field" onClick={() => handleRemoveField(index, 'blog_description')}>
                    <FaMinus />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => handleAddField('blog_description')}>Add Description</button>
            </div>
            <div className="form-group">
              <label htmlFor="file">Image</label>
              <input type="file" id="file" name="file" onChange={handleChange} />
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
                onChange={(e) => setFormData((prevData) => ({ ...prevData, gallery_files: [...e.target.files] }))}
              />
              {formData.gallery_files.length > 0 && (
                <div className="gallery-preview">
                  {Array.from(formData.gallery_files).map((file, index) => (
                    <img key={index} src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} />
                  ))}
                </div>
              )}
            </div>
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Create Blog'}
            </button>
          </form>
        </div>
        <div className="add_cats">
          <CategoryManagement />
        </div>

      </div>
    </>
  );
};

export default CreateBlog;
