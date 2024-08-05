'use client'
import Image from 'next/image';
import Link from 'next/link';
import blogbg from '../app/assets/home_images/blog-bg.png';
import { useEffect, useState } from 'react';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import { format } from 'date-fns'; 

const LatestBlog = () => {
  let [data, setData] = useState([]);
  let api = EXPORT_ALL_APIS();

  const fetchAllBlogs = async () => {
    try {
      let resp = await api.loadAllBlogs();
      setData(resp);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  let result = data ? data.result : [];
  let reversedBlogs = Array.isArray(result) ? [...result].reverse() : [];

  return (
    <div className='blog-bg' style={{ backgroundImage: `url(${blogbg.src})` }} >
      <div className="latest-blog">
        <h2 className='blog-heading'>Latest News And Inspirational Blog</h2>
        <div className='link-btn-heading'>
        <p>Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
        <Link href="/blog">
          <span className="view-all">View All Blogs</span>
        </Link>
      </div>
       
        <div className="blog-container">
          {reversedBlogs.length === 0 ? (
            <div>No result found</div>
          ) : (
            <>
              <div className="blog-main">
                {reversedBlogs.slice(0, 1).map((ele) => {
                  const formattedDate = format(new Date(ele.createdAt), 'dd MMM yyyy'); 

                  return (
                    <div key={ele._id}>
                      {ele.images?.map((e) => (
                        <Image
                          key={e._id}
                          src={`/uploads/${e.name}`}
                          alt={e.name}
                          width={400}
                          height={250}
                          className="image"
                        />
                      ))}
                      <div className="blog-content">
                        <div className='title_date'>
                          <span className="category">{ele.category?.name || 'Uncategorized'}</span>
                          <span className="date">{formattedDate}</span>
                        </div>
                        <h3>{ele.title}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="blog-side">
                {reversedBlogs.slice(0, 2).map((blog, index) => {
                  const formattedDate = format(new Date(blog.createdAt), 'dd MMM yyyy');  
                  return (
                    <div key={blog._id} className="blog-side-item">
                      {blog.images?.map((image) => (
                        <Image
                          key={image._id}
                          src={`/uploads/${image.name}`}
                          alt={blog.title}
                          width={200}
                          height={125}
                          className="blog-image"
                        />
                      ))}
                      <div className="blog-content">
                        <div className='title_date'>
                          <span className="category">{blog.category?.name || 'Uncategorized'}</span>
                          <span className="date">{formattedDate}</span>
                        </div>
                        <h3>{blog.title}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestBlog;