import Image from 'next/image';
import blogbg from '../app/assets/home_images/blog-bg.png';

const LatestBlog = () => {
  const blogs = [
    {
      title: 'A Coastal Paradise Discovering the Charms of Norway',
      date: '01 Jun 2024',
      category: 'Tips & Tricks',
      imgSrc: '/images/norway.png',
    },
    {
      title: 'A Coastal Paradise Discovering the Charms of Poland',
      date: '03 Jun 2024',
      category: 'Solo Travel',
      imgSrc: '/images/poland.png',
    },
    {
      title: 'A Coastal Paradise Discovering the Charms of Portugal',
      date: '10 Jun 2024',
      category: 'Packing Tips',
      imgSrc: '/images/portugal.png',
    },
  ];

  return (
    <div className='blog-bg' style= {{ backgroundImage: `url(${blogbg.src})`}} >
      <div className="latest-blog">
      <h2 className='blog-heading'>Latest News And Inspirational Blog</h2>
      <p>Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
      <div className="blog-container">
        <div className="blog-main">
          <Image src={blogs[0].imgSrc} alt={blogs[0].title} width={400} height={250} className="blog-image" />
          <div className="blog-content">
            <div className='title_date'>
            <span className="category">{blogs[0].category}</span>
            <span className="date">{blogs[0].date}</span>
            </div>
            <h3>{blogs[0].title}</h3>
            
          </div>
        </div>
        <div className="blog-side">
          {blogs.slice(1).map((blog, index) => (
            <div key={index} className="blog-side-item">
              <Image src={blog.imgSrc} alt={blog.title} width={200} height={125} className="blog-image" />
              <div className="blog-content">
              <div className='title_date'>
            <span className="category">{blogs[0].category}</span>
            <span className="date">{blogs[0].date}</span>
            </div>
                <h3>{blog.title}</h3>
             
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>

  );
};

export default LatestBlog;
