// /app/(admin)/admin/(packages)/packages/add-packages/page.jsx

// 'use client'
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const AddPackages = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     slug: '',
//     file: null,
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const { title, description, slug, file } = formData;

//     if (!title || !description || !slug || !file) {
//       setError('Please fill in all fields and upload an image.');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const submissionData = new FormData();
//       submissionData.append('title', title);
//       submissionData.append('description', description);
//       submissionData.append('slug', slug);
//       submissionData.append('file', file);

//       const res = await fetch('/api/v1/package/add', {
//         method: 'POST',
//         body: submissionData,
//       });

//       const data = await res.json();

//       if (data.success) {
//         router.push('/admin/packages');
//       } else {
//         setError(data.message || 'An error occurred.');
//       }
//     } catch (error) {
//       setError('An error occurred while submitting the form.');
//     }

//     setIsLoading(false);
//   };

//   return (
//     <div className="add-continent">
//       <h2>Add packages</h2>
//       {error && <div className="error">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter title"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Enter description"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="slug">Slug</label>
//           <input
//             type="text"
//             id="slug"
//             name="slug"
//             value={formData.slug}
//             onChange={handleChange}
//             placeholder="Enter slug"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="file">Image</label>
//           <input type="file" id="file" name="file" onChange={handleChange} />
//           {formData.file && (
//             <div className="image-preview">
//               <img src={URL.createObjectURL(formData.file)} alt="Preview" />
//             </div>
//           )}
//         </div>
//         <button type="submit" className="button" disabled={isLoading}>
//           {isLoading ? 'Loading...' : 'Add package'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddPackages;




'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './AddPackages.css';
import { FaMinus } from 'react-icons/fa';

const AddPackages = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    packageOverview: '',
    packageTopSummary: '',
    packageItinerary: [{ day: '', location: '', tourname: '', itinerary_description: '' }],
    packagesInclude: [{ description: '' }],
    packagesExclude: [{ description: '' }],
    file: null,
    galleryFiles: []
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      [field]: [...prevData[field], field === 'packageItinerary' ? { day: '', location: '', tourname: '', itinerary_description: '' } : { description: '' }]
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
      packageOverview,
      packageTopSummary,
      packageItinerary,
      packagesInclude,
      packagesExclude,
      file,
      galleryFiles
    } = formData;

    if (!title || !description || !slug || !file) {
      setError('Please fill in all required fields and upload an image.');
      setIsLoading(false);
      return;
    }

    try {
      const submissionData = new FormData();
      submissionData.append('title', title);
      submissionData.append('description', description);
      submissionData.append('slug', slug);
      submissionData.append('package_overview', packageOverview);
      submissionData.append('package_top_summary', packageTopSummary);
      submissionData.append('package_itinerary', JSON.stringify(packageItinerary));
      submissionData.append('packages_include', JSON.stringify(packagesInclude));
      submissionData.append('packages_exclude', JSON.stringify(packagesExclude));
      submissionData.append('file', file);
      galleryFiles.forEach((file) => {
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
    <div className="add-package-container">
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
          <label htmlFor="packageOverview">Package Overview</label>
          <textarea
            id="packageOverview"
            name="packageOverview"
            value={formData.packageOverview}
            onChange={handleChange}
            placeholder="Enter package overview"
          />
        </div>
        <div className="form-group">
          <label htmlFor="packageTopSummary">Package Top Summary</label>
          <textarea
            id="packageTopSummary"
            name="packageTopSummary"
            value={formData.packageTopSummary}
            onChange={handleChange}
            placeholder="Enter package top summary"
          />
        </div>
        <div className="form-group">
          <label>Package Itinerary</label>
          {formData.packageItinerary.map((item, index) => (
            <div key={index} className="itinerary-item">
              <input
                type="text"
                name="day"
                value={item.day}
                onChange={(e) => handleDynamicChange(e, index, 'packageItinerary')}
                placeholder="Day"
              />
              <input
                type="text"
                name="location"
                value={item.location}
                onChange={(e) => handleDynamicChange(e, index, 'packageItinerary')}
                placeholder="Location"
              />
              <input
                type="text"
                name="tourname"
                value={item.tourname}
                onChange={(e) => handleDynamicChange(e, index, 'packageItinerary')}
                placeholder="Tour Name"
              />
              <textarea
                name="itinerary_description"
                value={item.itinerary_description}
                onChange={(e) => handleDynamicChange(e, index, 'packageItinerary')}
                placeholder="Itinerary Description"
              />
              <div className="remove_package" onClick={() => handleRemoveField(index, 'packageItinerary')}>
                <FaMinus />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('packageItinerary')}>Add Itinerary</button>
        </div>
        <div className="form-group">
          <label>Packages Include</label>
          {formData.packagesInclude.map((item, index) => (
            <div key={index} className="include-item">
              <textarea
                name="description"
                value={item.description}
                onChange={(e) => handleDynamicChange(e, index, 'packagesInclude')}
                placeholder="Description"
              />
              <div className="remove_package" onClick={() => handleRemoveField(index, 'packagesInclude')}>
                <FaMinus />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('packagesInclude')}>Add Include</button>
        </div>
        <div className="form-group">
          <label>Packages Exclude</label>
          {formData.packagesExclude.map((item, index) => (
            <div key={index} className="exclude-item">
              <textarea
                name="description"
                value={item.description}
                onChange={(e) => handleDynamicChange(e, index, 'packagesExclude')}
                placeholder="Description"
              />
              <div className="remove_package" onClick={() => handleRemoveField(index, 'packagesExclude')}>
                <FaMinus />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('packagesExclude')}>Add Exclude</button>
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
          <label htmlFor="galleryFiles">Gallery Images</label>
          <input
            type="file"
            id="galleryFiles"
            name="galleryFiles"
            multiple
            onChange={(e) => setFormData((prevData) => ({ ...prevData, galleryFiles: [...e.target.files] }))}
          />
          {formData.galleryFiles.length > 0 && (
            <div className="gallery-preview">
              {Array.from(formData.galleryFiles).map((file, index) => (
                <img key={index} src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} />
              ))}
            </div>
          )}
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddPackages;
