'use client'

import { useEffect, useState } from "react"
import Topbanner from "../_common/layout/topbanner"
import Countrycard from "../(countries)/Components/country_cards"
import Layout from "../_common/layout/layout"
import { EXPORT_ALL_APIS } from "@/utils/apis/api"
import Explorations from "../(cities)/cities/Components/citiesinnercards"

export default function Page({ params }) {
  const { slug } = params
  const slugArray = Array.isArray(slug) ? slug : slug.split('/')
  const [continent, setContinent] = useState([])
  const [country, setCountry] = useState([])
  const [slugType, setSlugType] = useState('')
 
  const api = EXPORT_ALL_APIS()

  const loadData = async () => {
    try {
      // Check if the slugArray contains exactly 2 elements (e.g., continent and country)
      if (slugArray.length === 2) {
        // Fetch data for both continent and country in parallel
        const [continentData, countryData] = await Promise.all([
          api.loadSingleContinent(slugArray[0]), // Load continent data based on the first slug
          api.loadSingleCountry(slugArray[1])    // Load country data based on the second slug
        ]);
        // Set the state with the fetched data
        setContinent(continentData);
        setCountry(countryData);
        setSlugType('continent'); // Set slug type as 'continent' since both data were loaded
      }
  
      // If the slugArray contains 1 element or slugType is 'continent'
      if (slugArray.length === 1 || slugType === 'continent') {
        // Try to load continent data using the single slug
        const continentData = await api.loadSingleContinent(slugArray[0]);
        if (continentData) {
          // If continent data is found, update the state
          setContinent(continentData);
          setSlugType('continent'); // Set slug type as 'continent'
        }else{
          const countryData = await api.loadSingleContinent(slugArray[0]);
          if (countryData) {
            // If continent data is found, update the state
            setCountry(countryData);
            setSlugType('country'); // Set slug type as 'continent'
          }
        } 
      }


      if (slugArray.length === 1 || slugType === 'country') {
        // Try to load continent data using the single slug
        const continentData = await api.loadSingleContinent(slugArray[0]);
        if (continentData) {
          // If continent data is found, update the state
          setContinent(continentData);
          setSlugType('country'); // Set slug type as 'continent'
        }else{
          const continentData = await api.loadSingleContinent(slugArray[0]);
        if (continentData) {
          // If continent data is found, update the state
          setContinent(continentData);
          setSlugType('continent'); // Set slug type as 'continent'
        }
        } 
      }
  
       
    } catch (error) {
      console.error('Error loading data:', error); // Handle any errors that occur during data fetching
    } finally {
      // This block can be used for any cleanup operations, if necessary
    }
  };
  
  useEffect(() => {
    loadData(); // Call loadData when slugArray changes
  }, [slugArray]); // The effect runs whenever slugArray changes
  



  



  return (
    <Layout>
      {slugArray.length === 2 && slugType === 'continent' && (
        <>
          <Topbanner slug={slugArray[1]} />
          <Explorations slug={slugArray[1]} country={country} />
        </>
      )}
      {slugArray.length === 1 && slugType === 'continent' && (
        <>
          <Topbanner slug={slugArray[0]} />
          <Countrycard slug={slugArray[0]} continent={continent} />
        </>
      )}
      {slugArray.length === 1 && slugType === 'country' && (
        <>
          <Topbanner slug={slugArray[0]} />
          <Explorations slug={slugArray[0]} country={country} />
        </>
      )}
    </Layout>
  )
}