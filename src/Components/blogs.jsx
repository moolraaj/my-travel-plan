'use client';
import Image from 'next/image';
import Link from 'next/link';
import blogbg from '../app/assets/home_images/blog-bg.png';
import emptyImage from '../app/assets/empty.jpg';
 
import { format } from 'date-fns';

const LatestBlog = ({blogs}) => {

  let result=blogs?blogs.result:[]
   

  return (
    <div className='blog-bg' style={{ backgroundImage: `url(${blogbg.src})` }}>
      <div className="latest-blog">
        <h2 className='blog-heading'>Latest News And Inspirational Blog</h2>
        <div className='link-btn-heading'>
          <p>Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
          <Link href="/blog">
            <span className="view-all">View All Blogs</span>
          </Link>
        </div>

        <div className="blog-container">
          {result=== undefined||result===null ? (
            <EmptyBlogComponent/>
          ) : (
            <>
        
              <div className="blog-main">
                {result.slice(0, 1).map((ele) => {
                  const formattedDate = format(new Date(ele.createdAt), 'dd MMM yyyy');

                  return (
                    <Link href={`/blog/${ele.slug}`} key={ele._id}>
                    <div >
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
                    </Link>
                  );
                 
                })}
              </div>

              <div className="blog-side">
                {result.slice(0, 2).map((blog, index) => {
                  const formattedDate = format(new Date(blog.createdAt), 'dd MMM yyyy');
                  return (
                    <Link href={`/blog/${blog.slug}`} key={index}>
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
                    </Link>
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

function EmptyBlogComponent() {
  return (
    <>
      <div className="blog-main">
        <div className="blog-placeholder">
          <Image
            src={emptyImage.src}
            alt="Loading"
            width={400}
            height={250}
            className="image"
          />
          <div className="blog-content">
            <div className='title_date'>
              <span className="category">loading...</span>
              <span className="date">loading...</span>
            </div>
            <h3>loading...</h3>
          </div>
        </div>
      </div>

      <div className="blog-side">
        {Array(2).fill().map((_, index) => (
        
          <div key={index} className="blog-side-item">
            <Image
              src={emptyImage.src}
              alt="Loading"
              width={200}
              height={125}
              className="blog-image"
            />
            <div className="blog-content">
              <div className='title_date'>
                <span className="category">loading...</span>
                <span className="date">loading...</span>
              </div>
              <h3>loading...</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default LatestBlog;
