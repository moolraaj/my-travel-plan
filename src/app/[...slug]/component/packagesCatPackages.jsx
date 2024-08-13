'use client'
import { EXPORT_ALL_APIS } from '@/utils/apis/api'
import React, { useEffect, useState } from 'react'

function PackagesCatPackages({slug}) {
    let api=EXPORT_ALL_APIS()
    let [data,setData]=useState([])
    let fetchSinglePackage=async()=>{
        let resp=await api.loadSinglePackagesActivitiy(slug)
        setData(resp)
    }

    useEffect(()=>{
        fetchSinglePackage()
    },[])
    console.log(data)
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  )
}

export default PackagesCatPackages

