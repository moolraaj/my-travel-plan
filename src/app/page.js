'use client'
import World_section from '@/Components/worldSection';
import ExplorationsFarAway from '@/Components/countrySection';
import Slider from '@/Components/mainSlider';
import Destinations from '@/Components/topcoutrypackages';
import BestSellingPackages from '@/Components/packagecards';
import ExploreDestinations from '@/Components/exploredestinations';
import LatestBlog from '@/Components/blogs';
import { useEffect, useState } from 'react';
import Layout from './_common/layout/layout';

export default function Home() {
  let[ss,setSs]=useState([])
  const fetchalldata=async()=>{
    let resp=await fetch(`/api/v1/continents`)
    let data=await resp.json()
    setSs(data.response)
    return data
  }

  useEffect(()=>{
    fetchalldata()
  },[])
  console.log(ss)
  return (
 <>
 <Layout>
   <div className='main_slider'>
   <div className='main_slider_inner'>
   <Slider/>
   </div>

     <div className='outer_section'>
   
      <World_section/>
      <Destinations/>
        <ExplorationsFarAway/>

      <BestSellingPackages/>

      <ExploreDestinations/> 

      <LatestBlog/>  



     </div>

     </div>  
 {
  ss.map((ele)=>{
    return <div key={ele._id}>
      <img src={ele.images.map((e)=>(
        `http://localhost:3000/uploads/${e.name}`
      ))
} />
      <h1>{ele.description}</h1>
      <h1>{ele.description}</h1>
    </div>
  })
 }
 </Layout>
 </>


     
  );
}
