// /app/(admin)/admin/(packages)/packages/update-package/[id]/page.jsx

'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaMinus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { handelAsyncErrors } from '@/helpers/asyncErrors';

const generateOptions = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

const UpdatePackage = ({ params }) => {
  const { id } = params;
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
    gallery_files: [],
    city_id: '',
    package_price: '',
    package_discounted_price: '',
    package_days: '1',
    package_nights: '1'
  });
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPackageData = async () => {
    return handelAsyncErrors(async () => {
      try {
        const res = await fetch(`/api/v1/package/getbyid/${id}`);
        const data = await res.json();
        console.log('Fetched package data:', data); // Debugging line
        if (data.success) {
          setFormData((prevData) => ({
            ...prevData,
            ...data.result,
            packageItinerary: data.result.packageItinerary || [{ day: '', location: '', tourname: '', itinerary_description: '' }],
            packagesInclude: data.result.packagesInclude || [{ description: '' }],
            packagesExclude: data.result.packagesExclude || [{ description: '' }],
          }));
        } else {
          toast.error('Failed to fetch package data');
        }
      } catch (error) {
        console.error('Error fetching package data:', error);
        toast.error('An error occurred while fetching package data.');
      }
    });
  };

  const fetchCities = async () => {
    return handelAsyncErrors(async () => {
      try {
        const res = await fetch(`/api/v1/cities/get?page=1&limit=1000`, {
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        const data = await res.json();
        if (data.success) {
          setCities(data.result); 
        } else {
          toast.error('Failed to fetch cities');
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        toast.error('An error occurred while fetching cities.');
      }
    });
  };

  useEffect(() => {
    if (id) {
      fetchCities();
      fetchPackageData();
    }
  }, [id]);

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
      gallery_files,
      city_id,
      package_price,
      package_discounted_price,
      package_days,
      package_nights
    } = formData;

    if (!title || !description || !slug || !file || !city_id) {
      toast.error('Please fill in all required fields and upload an image.');
      setIsLoading(false);
      return;
    }

    return handelAsyncErrors(async () => {
      const submissionData = new FormData();
      submissionData.append('title', title);
      submissionData.append('description', description);
      submissionData.append('slug', slug);
      submissionData.append('package_price', package_price);
      submissionData.append('package_discounted_price', package_discounted_price);
      submissionData.append('package_days', package_days);
      submissionData.append('package_nights', package_nights);
      submissionData.append('package_overview', packageOverview);
      submissionData.append('package_top_summary', packageTopSummary);
      submissionData.append('package_itinerary', JSON.stringify(packageItinerary));
      submissionData.append('packages_include', JSON.stringify(packagesInclude));
      submissionData.append('packages_exclude', JSON.stringify(packagesExclude));
      submissionData.append('file', file);
      submissionData.append('city_id', city_id);
      gallery_files.forEach((file) => {
        submissionData.append('gallery_files', file);
      });

      const res = await fetch(`/api/v1/package/update/${id}`, {
        method: 'PUT',
        body: submissionData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Package updated successfully!');
        router.push('/admin/packages');
      } else {
        setError(data.message || 'An error occurred.');
        toast.error(data.message || 'An error occurred.');
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="add-package-container">
      <ToastContainer />
      <h2>Update Package</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
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
          <label htmlFor="package_price">Package Price</label>
          <input
            type="number"
            id="package_price"
            name="package_price"
            value={formData.package_price}
            onChange={handleChange}
            placeholder="Enter package price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="package_discounted_price">Discounted Price</label>
          <input
            type="number"
            id="package_discounted_price"
            name="package_discounted_price"
            value={formData.package_discounted_price}
            onChange={handleChange}
            placeholder="Enter discounted price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="package_days">Package Days</label>
          <select
            id="package_days"
            name="package_days"
            value={formData.package_days}
            onChange={handleChange}
          >
            {generateOptions(1, 100).map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="package_nights">Package Nights</label>
          <select
            id="package_nights"
            name="package_nights"
            value={formData.package_nights}
            onChange={handleChange}
          >
            {generateOptions(1, 100).map((night) => (
              <option key={night} value={night}>{night}</option>
            ))}
          </select>
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
          <label htmlFor="packageTopSummary">Top Summary</label>
          <textarea
            id="packageTopSummary"
            name="packageTopSummary"
            value={formData.packageTopSummary}
            onChange={handleChange}
            placeholder="Enter top summary"
          />
        </div>
        {/* Handle dynamic fields for itinerary, include, exclude */}
        <div className="form-group">
          <label htmlFor="packageItinerary">Package Itinerary</label>
          {formData.packageItinerary.map((item, index) => (
            <div key={index}>
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
              <button type="button" onClick={() => handleRemoveField(index, 'packageItinerary')}>
                <FaMinus />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('packageItinerary')}>Add Itinerary Item</button>
        </div>
        <div className="form-group">
          <label htmlFor="packagesInclude">Packages Include</label>
          {formData.packagesInclude.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleDynamicChange(e, index, 'packagesInclude')}
                placeholder="Include Description"
              />
              <button type="button" onClick={() => handleRemoveField(index, 'packagesInclude')}>
                <FaMinus />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('packagesInclude')}>Add Include Item</button>
        </div>
        <div className="form-group">
          <label htmlFor="packagesExclude">Packages Exclude</label>
          {formData.packagesExclude.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleDynamicChange(e, index, 'packagesExclude')}
                placeholder="Exclude Description"
              />
              <button type="button" onClick={() => handleRemoveField(index, 'packagesExclude')}>
                <FaMinus />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('packagesExclude')}>Add Exclude Item</button>
        </div>
        <div className="form-group">
          <label htmlFor="city_id">City</label>
          <select
            id="city_id"
            name="city_id"
            value={formData.city_id}
            onChange={handleChange}
          >
            {cities.map((city) => (
              <option key={city._id} value={city._id}>{city.title}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="file">Package Image</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
          />
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Package'}
        </button>
      </form>
    </div>
  );
};

export default UpdatePackage;
