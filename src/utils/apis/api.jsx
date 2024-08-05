import { handelAsyncErrors } from "@/helpers/asyncErrors";

export const EXPORT_ALL_APIS = () => {
    const loadAllContinents = async () => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/continents/get`);
            let data = await resp.json();
            return data;
        });
    };


    const loadAllCountries = async () => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/countries/get`);
            let data = await resp.json();
            return data;
        });
    };
    const loadAllPackages = async () => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/packages/get`);
            let data = await resp.json();
            return data;
        });
    };
    const loadAllBlogs = async () => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/blogs/get`);
            let data = await resp.json();
            return data;
        });
    };
    const loadAllCitiesWithLowestPrices = async () => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/cities/cities-with-lowest-price`);
            let data = await resp.json();
            return data;
        });
    };


    /////////////////////////********************************************
    const sendQueryContactUs = async (formData) => {
        return await handelAsyncErrors(async () => {
            let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/sendquery/query/send`,{
                method:'POST',
                body:formData
            }) 
            let data = await resp.json();
            return data;
        });
    };
    

    
    return {
        loadAllContinents,
        loadAllCountries,
        loadAllPackages,
        loadAllBlogs,
        loadAllCitiesWithLowestPrices,
        sendQueryContactUs
    };
};


export const PER_PAGE_LIMIT=10
