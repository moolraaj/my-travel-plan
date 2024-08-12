// /app/(admin)/admin/(activities)/activities/update-activity/[id]/page.jsx

'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { handelAsyncErrors } from '@/helpers/asyncErrors';

const UpdateActivity = ({params}) => {
  const router = useRouter();
  const { id } = params;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    activityOverview: '',
    activityTopSummary: '',
    file: null,
    icon: null,
    gallery_files: [],
    city_id: '',
    activity_price: '',
    activity_discounted_price: '',
  });

  const [cities, setCities] = useState([]);
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch activity data by ID
  const fetchActivity = async () => {
    return handelAsyncErrors(async () => {
      const res = await fetch(`/api/v1/activity/getbyid/${id}`);
      const data = await res.json();
      if (data.success) {
        setActivity(data.result);
        setFormData({
          ...data.result,
          file: null,
          icon: null,
          gallery_files: [],
        });
      } else {
        toast.error(data.message || 'Failed to fetch activity');
      }
    });
  };

  // Fetch cities for dropdown
  const fetchCities = async () => {
    return handelAsyncErrors(async () => {
      const res = await fetch('/api/v1/cities/get?page=1&limit=1000', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data = await res.json();
      if (data.success) {
        setCities(data.result);
      } else {
        toast.error(data.message || 'Failed to fetch cities');
      }
    });
  };

  useEffect(() => {
    fetchActivity();
    fetchCities();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      gallery_files: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const {
      title,
      description,
      slug,
      activityOverview,
      activityTopSummary,
      file,
      icon,
      gallery_files,
      city_id,
      activity_price,
      activity_discounted_price,
    } = formData;

    if (
      !title ||
      !description ||
      !slug ||
      !activityOverview ||
      !activityTopSummary ||
      !city_id ||
      !activity_price ||
      !activity_discounted_price
    ) {
      toast.error('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    const submissionData = new FormData();
    submissionData.append('title', title);
    submissionData.append('description', description);
    submissionData.append('slug', slug);
    submissionData.append('activity_overview', activityOverview);
    submissionData.append('activity_top_summary', activityTopSummary);
    if (file) submissionData.append('file', file);
    if (icon) submissionData.append('icon', icon);
    submissionData.append('activity_price', activity_price);
    submissionData.append('activity_discounted_price', activity_discounted_price);
    submissionData.append('city_id', city_id);

    gallery_files.forEach((file) => {
      submissionData.append('activity_galleries', file);
    });

    return handelAsyncErrors(async () => {
      const res = await fetch(`/api/v1/activity/update/${id}`, {
        method: 'PUT',
        body: submissionData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || 'Activity updated successfully!');
        router.push('/admin/activities');
      } else {
        toast.error(data.message || 'An error occurred.');
      }

      setIsLoading(false);
    });
  };

  if (!activity) return <p>Loading...</p>;

  return (
    <div className="update-activity-container">
      <h2>Update Activity</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="activityOverview">Activity Overview</label>
          <textarea
            name="activityOverview"
            value={formData.activityOverview}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="activityTopSummary">Activity Top Summary</label>
          <textarea
            name="activityTopSummary"
            value={formData.activityTopSummary}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="file">Main Image</label>
          <input type="file" name="file" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="icon">Icon</label>
          <input type="file" name="icon" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="gallery_files">Gallery Images</label>
          <input type="file" name="gallery_files" onChange={handleGalleryChange} multiple />
        </div>
        <div>
          <label htmlFor="city_id">City</label>
          <select name="city_id" value={formData.city_id} onChange={handleChange} required>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="activity_price">Price</label>
          <input
            type="number"
            name="activity_price"
            value={formData.activity_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="activity_discounted_price">Discounted Price</label>
          <input
            type="number"
            name="activity_discounted_price"
            value={formData.activity_discounted_price}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Activity'}
        </button>
      </form>
    </div>
  );
};

export default UpdateActivity;
