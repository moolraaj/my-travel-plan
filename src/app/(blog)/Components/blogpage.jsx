'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import commentimg from '../../assets/home_images/comment.svg';
import calenderimg from '../../assets/home_images/calender.svg';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import { format } from 'date-fns';
 

 

const BlogCard = ({blog,formattedDate}) => {
  
  return (
    <div className="blogpagecard">
     
      {blog.images?.map((e) => (
        <img
        src={`/uploads/${e.name}`}

          key={e._id}
          alt='blog-image'
          className="image"
        />
      ))}
      <div className="blogcontent">
        <div className="category">{blog.category||'uncategorised'}</div>
        <div className="meta">
          <span className="date">
            <img src={calenderimg.src} alt="Calendar" />{formattedDate}
          </span>
          <span className="comments">
            <img src={commentimg.src} alt="Comments" />{blog.comments||null}
          </span>
        </div>
        <h3 className="title">{blog.title}</h3>
        <Link href={`/blog/${blog.slug}`}>
          <button className="link">Read More → </button>
        </Link>
      </div>
    </div>
  );
};


 

const BlogCardsContainer = () => {
  let api=EXPORT_ALL_APIS()
  let [data,setData]=useState([])
  let LoadAllBlogs=async()=>{
    let resp=await api.loadAllBlogs()
    setData(resp)
  }
  useEffect(()=>{
    LoadAllBlogs()
  },[])
  let result=data?data.result:[]

  return (
    <div className="blog-page">
      {result===undefined||result===null?('no result found'):(result.map((blog,index)=>{
        const formattedDate = format(new Date(blog.createdAt), 'dd MMM yyyy')
        return  <BlogCard key={index} blog={blog} formattedDate={formattedDate}/>
      }))}
        
       
      
    </div>
  );
};

export default BlogCardsContainer;
