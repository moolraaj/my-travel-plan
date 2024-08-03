// components/BlogCardsContainer.js
import React from 'react';
import Link from 'next/link';
import commentimg from '../../assets/home_images/comment.svg';
import calenderimg from '../../assets/home_images/calender.svg';

const blogData = [
  {
    image: "/images/blog-1.png",
    category: "Adventure",
    date: "March 28, 2023",
    comments: "2 Comments",
    title: "You should see things when visiting Japan",
    link: "#",
    slug: "visiting-japan",
  },
  {
    image: "/images/blog-2.png",
    category: "City Tours",
    date: "March 28, 2023",
    comments: "2 Comments",
    title: "A place where start new life with adventure travel",
    link: "#",
    slug: "adventure-travel",
  },
  {
    image: "/images/blog-3.png",
    category: "City Tours",
    date: "March 28, 2023",
    comments: "2 Comments",
    title: "A place where start new life with adventure Dhaka",
    link: "#",
    slug: "adventure-dhaka",
  },
  {
    image: "/images/blog-4.png",
    category: "City Tours",
    date: "March 28, 2023",
    comments: "2 Comments",
    title: "A place where start new life with adventure Dhaka",
    link: "#",
    slug: "adventure-dhaka",
  },
  {
    image: "/images/blog-5.png",
    category: "City Tours",
    date: "March 28, 2023",
    comments: "2 Comments",
    title: "A place where start new life with adventure travel",
    link: "#",
    slug: "adventure-travel",
  },
];

const BlogCard = ({ image, category, date, comments, title, link, slug }) => {
  return (
    <div className="blogpagecard">
      <img src={image} alt={title} className="image" />
      <div className="blogcontent">
        <div className="category">{category}</div>
        <div className="meta">
          <span className="date">
            <img src={calenderimg.src} alt="Calendar" />{date}
          </span>
          <span className="comments">
            <img src={commentimg.src} alt="Comments" />{comments}
          </span>
        </div>
        <h3 className="title">{title}</h3>
        <Link href={`/blog/${slug}`}>
          <button className="link">Read More → </button>
        </Link>
      </div>
    </div>
  );
};

const BlogCardsContainer = () => {
  return (
    <div className="blog-page">
      {blogData.map((blog, index) => (
        <BlogCard key={index} {...blog} />
      ))}
    </div>
  );
};

export default BlogCardsContainer;
