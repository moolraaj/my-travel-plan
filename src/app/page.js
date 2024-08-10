
 

'use client' 
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import Layout from './_common/layout/layout';
import Homepage from './_homepage/homepage';
import { useEffect, useState } from 'react';
 

export default  function Home() {
  
  let api=EXPORT_ALL_APIS()
  let [loading, setLoading] = useState(true);
  let[continent,setContinent]=useState([])
  let[country,setCountry]=useState([])
  let[city,setCity]=useState([])
  let[packages,setPackages]=useState([])
  let[blogs,setBlogs]=useState([])

  let fetchAllContinents=async()=>{
    let data=await api.loadAllContinents()
    setContinent(data)
    setLoading(false)
  }

  let fetchAllCountries=async()=>{
    let data=await api.loadAllCountries()
    setCountry(data)
    setLoading(false)
  }
  let fetchAllCities=async()=>{
    let data=await api.loadAllCitiesWithLowestPrices()
    setCity(data)
    setLoading(false)
  }

  let fetchAllPackages=async()=>{
    let data=await api.loadAllPackages()
    setPackages(data)
    setLoading(false)
  }
  let fetchAllBlogs=async()=>{
    let data=await api.loadAllBlogs()
    setBlogs(data)
    setLoading(false)
  }




  useEffect(()=>{
    fetchAllContinents()
    fetchAllCountries()
    fetchAllCities()
    fetchAllPackages()
    fetchAllBlogs()
  },[])


 

  return (
    
    <>
      <Layout>
        <h1></h1>
      
        <Homepage continent={continent} loading={loading} country={country} city={city} packages={packages} blogs={blogs}/>

      </Layout>
    </>



  );
}
