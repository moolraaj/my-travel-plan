'use client'
import React from 'react'
import Topbanner from "@/app/_common/layout/topbanner";
import Layout from "@/app/_common/layout/layout";
import Bloggallery from './components/overview';

export default function page({params}) {
    let {slug}=params

    
 
 
  return (
    <div>
      <Layout>
          <Topbanner slug={slug}/>  
          <Bloggallery slug={slug}/>
       
      </Layout>
    </div>
  );
}
