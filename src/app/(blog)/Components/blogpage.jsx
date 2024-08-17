'use client'
import React, { useEffect, useState } from 'react';


import { EXPORT_ALL_APIS } from '@/utils/apis/api';

import BlogCard from './blogCard';
 

 




 

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
      <BlogCard result={result}/>
    </div>
  );
};

export default BlogCardsContainer;
