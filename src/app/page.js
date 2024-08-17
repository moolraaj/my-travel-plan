
 

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





'use client';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import Layout from './_common/layout/layout';
import Homepage from './_homepage/homepage';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import BookingForm from '@/Components/(bookings)/bookings/bookingForm';
import LoginPopup from '@/Components/loginPopup/Components/popup';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [continent, setContinent] = useState([]);
    const [country, setCountry] = useState([]);
    const [city, setCity] = useState([]);
    const [packages, setPackages] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [packagescat, setPackagesCat] = useState([]);

    // State for managing pop-ups
    const [isopenForm, setIsopenForm] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [userVerified, setUserVerified] = useState(false);

    useEffect(() => {
        // Function to fetch all necessary data
        const fetchData = async () => {
            let api = EXPORT_ALL_APIS();
            let data;

            data = await api.loadAllContinents();
            setContinent(data);
            data = await api.loadAllCountries();
            setCountry(data);
            data = await api.loadAllCitiesWithLowestPrices();
            setCity(data);
            data = await api.loadAllPackages();
            setPackages(data);
            data = await api.loadAllBlogs();
            setBlogs(data);
            data = await api.loadAllPackagesActivities();
            setPackagesCat(data);
            setLoading(false);
        };

        // Check session and handle pop-ups
        const checkSessionAndShowPopups = async () => {
            const popupShown = sessionStorage.getItem('popupShown');
            
            if (!popupShown) {
                try {
                    const session = await getSession();
                    if (session && session.user) {
                        setUserVerified(session.user.role === 'user');
                        setIsopenForm(true);   
                        setIsLogin(false);     
                    } else {
                        setUserVerified(false);
                        setIsLogin(true);     // Show LoginPopup
                        setIsopenForm(false); // Ensure BookingForm is not shown
                    }

                    // Mark the popup as shown
                    sessionStorage.setItem('popupShown', 'true');
                } catch (error) {
                    console.error('Error checking verification:', error);
                }
            }
        };

        fetchData().then(() => checkSessionAndShowPopups());
    }, []);

    return (
        <>
            {/* Pop-ups for login and booking form */}
            {isopenForm && <BookingForm setIsopenForm={setIsopenForm} />}
            {isLogin && <LoginPopup setIsLogin={setIsLogin} />}

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
