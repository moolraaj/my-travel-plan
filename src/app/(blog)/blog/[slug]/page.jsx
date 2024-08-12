
import React from 'react'
import Topbanner from "@/app/_common/layout/topbanner";
import Layout from "@/app/_common/layout/layout";
import Bloggallery from './components/overview';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';

export default async  function page({params}) {
    let {slug}=params
    let api=EXPORT_ALL_APIS()
    let data=await api.loadSingleBlog(slug)

    
 
 
  return (
    <div>
      <Layout>
          <Topbanner slug={slug}/>  
          <Bloggallery data={data}/>
       
      </Layout>
    </div>
  );
}
