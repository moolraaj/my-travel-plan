
 

// 'use client' 
// import { EXPORT_ALL_APIS } from '@/utils/apis/api';
// import Layout from './_common/layout/layout';
// import Homepage from './_homepage/homepage';
// import { useEffect, useState } from 'react';
 

// export default  function Home() {
  
//   let api=EXPORT_ALL_APIS()
//   let [loading, setLoading] = useState(true);
//   let[continent,setContinent]=useState([])
//   let[country,setCountry]=useState([])
//   let[city,setCity]=useState([])
//   let[packages,setPackages]=useState([])
//   let[blogs,setBlogs]=useState([])
//   let[packagescat,setPackagesCat]=useState([])

//   let fetchAllContinents=async()=>{
//     let data=await api.loadAllContinents()
//     setContinent(data)
//     setLoading(false)
//   }

//   let fetchAllCountries=async()=>{
//     let data=await api.loadAllCountries()
//     setCountry(data)
//     setLoading(false)
//   }
//   let fetchAllCities=async()=>{
//     let data=await api.loadAllCitiesWithLowestPrices()
//     setCity(data)
//     setLoading(false)
//   }

//   let fetchAllPackages=async()=>{
//     let data=await api.loadAllPackages()
//     setPackages(data)
//     setLoading(false)
//   }
//   let fetchAllBlogs=async()=>{
//     let data=await api.loadAllBlogs()
//     setBlogs(data)
//     setLoading(false)
//   }
//   let fetchAllPackagesCategories=async()=>{
//     let data=await api.loadAllPackagesActivities()
//     setPackagesCat(data)
//     setLoading(false)
//   }




//   useEffect(()=>{
//     fetchAllContinents()
//     fetchAllCountries()
//     fetchAllCities()
//     fetchAllPackages()
//     fetchAllBlogs()
//     fetchAllPackagesCategories()
//   },[])



  


 

//   return (
    
//     <>
//       <Layout>
    
      
//         <Homepage continent={continent} loading={loading} country={country} city={city} packages={packages} blogs={blogs} packagescat={packagescat}/>

//       </Layout>
//     </>



//   );
// }



'use client'

import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import Layout from './_common/layout/layout';
import Homepage from './_homepage/homepage';
import { useEffect, useState } from 'react';

export default function Home() {
    let api = EXPORT_ALL_APIS();
    let [loading, setLoading] = useState(true);
    let [continent, setContinent] = useState([]);
    let [country, setCountry] = useState([]);
    let [city, setCity] = useState([]);
    let [packagescat, setPackagescat] =useState([]);
    let [packages, setPackages] = useState([]);
    let [blogs, setBlogs] = useState([]);

    const fetchData = async () => {
        try {
            const localStorageKeyPrefix = 'myAppData_';
            // Check if data exists in localStorage
            const storedContinents = localStorage.getItem(`${localStorageKeyPrefix}continents`);
            if (storedContinents) {
                setContinent(JSON.parse(storedContinents));
            } else {
                const data = await api.loadAllContinents();
                setContinent(data);
                localStorage.setItem(`${localStorageKeyPrefix}continents`, JSON.stringify(data));
            }

            const storedCountries = localStorage.getItem(`${localStorageKeyPrefix}countries`);
            if (storedCountries) {
                setCountry(JSON.parse(storedCountries));
            } else {
                const data = await api.loadAllCountries();
                setCountry(data);
                localStorage.setItem(`${localStorageKeyPrefix}countries`, JSON.stringify(data));
            }

            const storedCities = localStorage.getItem(`${localStorageKeyPrefix}cities_with_lowest_prices`);
            if (storedCities) {
                setCity(JSON.parse(storedCities));
            } else {
                const data = await api.loadAllCitiesWithLowestPrices();
                setCity(data);
                localStorage.setItem(`${localStorageKeyPrefix}cities_with_lowest_prices`, JSON.stringify(data));
            }

            const storedPackages = localStorage.getItem(`${localStorageKeyPrefix}packages`);
            if (storedPackages) {
                setPackages(JSON.parse(storedPackages));
            } else {
                const data = await api.loadAllPackages();
                setPackages(data);
                localStorage.setItem(`${localStorageKeyPrefix}packages`, JSON.stringify(data));
            }

            const storedBlogs = localStorage.getItem(`${localStorageKeyPrefix}blogs`);
            if (storedBlogs) {
                setBlogs(JSON.parse(storedBlogs));
            } else {
                const data = await api.loadAllBlogs();
                setBlogs(data);
                localStorage.setItem(`${localStorageKeyPrefix}blogs`, JSON.stringify(data));
            }

            const storedActivities = localStorage.getItem(`${localStorageKeyPrefix}activities`);
            if (storedBlogs) {
              setPackagescat(JSON.parse(storedActivities));
            } else {
                const data = await api.loadAllPackagesActivities();
                setPackagescat(data);
                localStorage.setItem(`${localStorageKeyPrefix}activities`, JSON.stringify(data));
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Layout>
                <Homepage 
                    continent={continent} 
                    loading={loading} 
                    country={country} 
                    city={city} 
                    packages={packages} 
                    blogs={blogs}
                    packagescat={packagescat}
                />
            </Layout>
        </>
    );
}