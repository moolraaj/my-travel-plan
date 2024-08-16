
// src/utils/apis/api.jsx
import { handelAsyncErrors } from "@/helpers/asyncErrors";

export const EXPORT_ALL_APIS = () => {
    const loadAllContinents = async () => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/continents/get`);
            let data = await resp.json();
            return data;
        });
    };
    const loadSingleContinent = async (slug) => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/continent/getbyslug/${slug}`);
            let data = await resp.json();
            return data;
        });
    };


    const loadAllCountries = async () => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/countries/get`);
            let data = await resp.json();
            return data;
        });
    };
    const loadSingleCountry= async (slug) => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/countries/get/${slug}`);
            let data = await resp.json();
            return data;
        });
    };
    const loadSingleCity= async (slug) => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/city/getbyslug/${slug}`);
            let data = await resp.json();
            return data;
        });
    };
    



    const loadAllPackages = async () => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/packages/get`);
            let data = await resp.json();
            return data;
        });
    };

   

    const loadAllBlogs = async () => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/blogs/get`);
            let data = await resp.json();
            return data;
        });
    };

    const loadSingleBlog = async (slug) => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/blog/getbyslug/${slug}`);
            let data = await resp.json();
            return data;
        });
    };

    const loadAllCities = async () => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/cities/get`);
            let data = await resp.json();
            return data;
        });
    };

    const loadAllCitiesWithLowestPrices = async () => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/cities/cities-with-lowest-price`);
            let data = await resp.json();
            return data;
        });
    };

  
    const loadSinglePackage= async (slug) => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/package/getbyslug/${slug}`);
            let data = await resp.json();
            return data;
        });
    };
    const loadSingleActivity= async (slug) => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/activity/getbyslug/${slug}`);
            let data = await resp.json();
            return data;
        });
    };

    const loadAllActivities= async () => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/activities/get`);
            let data = await resp.json();
            return data;
        });
    };

    const loadAllPackagesActivities= async () => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/package-categories/get`);
            let data = await resp.json();
            return data;
        });
    };
    const loadSinglePackagesActivitiy= async (slug) => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/package-category/getbyslug/${slug}`);
            let data = await resp.json();
            return data;
        });
    };


    /////////////////////////********************************************
    const sendQueryContactUs = async (formData) => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/sendquery/query/send`,{
                method:'POST',
                body:formData
            }) 
            let data = await resp.json();
            return data;
        });
    };

    const sendQueryBookings = async (formData) => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/booking/sendquery`,{
                method:'POST',
                body:formData
            }) 
            let data = await resp.json();
            return data;
        });
    };

    const registerUser=async(phoneNumber,name)=>{
        let resp=await fetch(`/api/v1/otpuser/register`,{
            method:'POST',
            body:JSON.stringify({phoneNumber,name})
        })
        let result=await resp.json()
        return result
    }
    
    const loadAllRegisteredUsers=async()=>{
        let resp=await fetch(`/api/v1/otpuser/getallusers`,{
            method:'POST',
            body:JSON.stringify()
        })
        let result=await resp.json()
        return result
    }
 

    const sendQueryFlights = async (formData) => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`/api/v1/flight/query/send`,{
                method:'POST',
                body:formData
            }) 
            let data = await resp.json();
            return data;
        });
    };
    

    
    return {
        loadAllContinents,
        loadSingleContinent,
        loadSingleCountry,
        loadSingleCity,
        loadAllCountries,
        loadAllPackages,
        loadAllBlogs,
        loadSingleBlog,
        loadAllCitiesWithLowestPrices,
        loadAllCities,
        loadSinglePackage,
        loadSingleActivity,
        loadAllActivities,
        loadAllPackagesActivities,
        loadSinglePackagesActivitiy,
        sendQueryContactUs,
        registerUser,
        loadAllRegisteredUsers,
        sendQueryBookings,
    };
};


export const PER_PAGE_LIMIT=10
