
 

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




  useEffect(()=>{
    fetchAllContinents()
    fetchAllCountries()
    fetchAllCities()
  },[])


 

  return (
    <>
      <Layout>
      
        <Homepage continent={continent} loading={loading} country={country} city={city}/>

      </Layout>
    </>



  );
}
