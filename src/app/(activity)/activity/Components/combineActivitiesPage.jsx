'use client'
import Topbanner from '@/app/_common/layout/topbanner'
import React, { useEffect, useState } from 'react'
import TopActivities from './top_activities'
import TopDiscountedActivities from './top_discounted_activities'
import TopDestinations from './Top_destination'
import LatestBlog from '@/Components/blogs'
import { EXPORT_ALL_APIS } from '@/utils/apis/api'

function CombineActivitiesPage() {
    let api=EXPORT_ALL_APIS()
    let [data,setData]=useState([]) 
    let [city,setCity]=useState([]) 
    let [blog,setBlog]=useState([])

    let fetchAllActivities=async()=>{
        let resp=await api.loadAllActivities()
        setData(resp)
    }
    let fetchAllCountries=async()=>{
        let resp=await api.loadAllCities()
        setCity(resp)
    }
    let fetchAllBlog=async()=>{
        let resp=await api.loadAllBlogs()
        setBlog(resp)
    }
    useEffect(()=>{
        fetchAllActivities()
        fetchAllCountries()
        fetchAllBlog()
    },[])

    let result=data?data.result:[]
    let response=city?city.result:[]
  
  return (
     <>
      <div className='outer_section_abanner'>
      <Topbanner/>
     </div> 
      <TopActivities result={result}/>
      <TopDiscountedActivities result={result}/>
      <TopDestinations response={response}/>
     <div className='blog_custom'>
      <LatestBlog blogs={blog}/>
      </div>
     </>
  )
}

export default CombineActivitiesPage
