
import { handelAsyncErrors } from "@/helpers/asyncErrors";

export const EXPORT_ALL_APIS = () => {
    
    // define function  here to call all apis
    const fetchApi = async (url, options = {}) => {
        return await handelAsyncErrors(async () => {
            const resp = await fetch(url, options);
            const data = await resp.json();
            return data;
        });
    };

    const loadAllContinents = () => fetchApi(`/api/v1/continents/get`);
    const loadSingleContinent = (slug) => fetchApi(`/api/v1/continent/getbyslug/${slug}`);
    
    const loadAllCountries = () => fetchApi(`/api/v1/countries/get`);
    const loadSingleCountry = (slug) => fetchApi(`/api/v1/countries/get/${slug}`);
    
    const loadSingleCity = (slug) => fetchApi(`/api/v1/city/getbyslug/${slug}`);
    const loadAllCities = () => fetchApi(`/api/v1/cities/get`);
    const loadAllCitiesWithLowestPrices = () => fetchApi(`/api/v1/cities/cities-with-lowest-price`);
    
    const loadAllPackages = () => fetchApi(`/api/v1/packages/get`);
    const loadSinglePackage = (slug) => fetchApi(`/api/v1/package/getbyslug/${slug}`);
    
    const loadAllBlogs = () => fetchApi(`/api/v1/blogs/get`);
    const loadSingleBlog = (slug) => fetchApi(`/api/v1/blog/getbyslug/${slug}`);
    
    const loadAllActivities = () => fetchApi(`/api/v1/activities/get`);
    const loadSingleActivity = (slug) => fetchApi(`/api/v1/activity/getbyslug/${slug}`);
    
    const loadAllPackagesActivities = () => fetchApi(`/api/v1/package-categories/get`);
    const loadSinglePackagesActivity = (slug) => fetchApi(`/api/v1/package-category/getbyslug/${slug}`);
    
    const loadSingleUserbookingsdetails = (user_id) => fetchApi(`/api/v1/otpuser/getbyid/${user_id}`);
    
    const sendQueryContactUs = (formData) => fetchApi(`/api/v1/sendquery/query/send`, { method: 'POST', body: formData });
    const sendQueryBookings = (formData) => fetchApi(`/api/v1/booking/sendquery`, { method: 'POST', body: formData });
    const sendQueryFlights = (formData) => fetchApi(`/api/v1/flight/query/send`, { method: 'POST', body: formData });
    
    const registerUser = (phoneNumber, name) => fetchApi(`/api/v1/otpuser/register`, {
        method: 'POST',
        body: JSON.stringify({ phoneNumber, name })
    });
    
    const loadAllRegisteredUsers = () => fetchApi(`/api/v1/otpuser/getallusers`, {
        method: 'POST',
        body: JSON.stringify()
    });

    return {
        loadAllContinents,
        loadSingleContinent,
        loadAllCountries,
        loadSingleCountry,
        loadSingleCity,
        loadAllCities,
        loadAllCitiesWithLowestPrices,
        loadAllPackages,
        loadSinglePackage,
        loadAllBlogs,
        loadSingleBlog,
        loadAllActivities,
        loadSingleActivity,
        loadAllPackagesActivities,
        loadSinglePackagesActivity,
        loadSingleUserbookingsdetails,
        sendQueryContactUs,
        sendQueryBookings,
        sendQueryFlights,
        registerUser,
        loadAllRegisteredUsers,
    };
};

export const PER_PAGE_LIMIT = 10;
