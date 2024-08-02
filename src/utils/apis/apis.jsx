// /utils/apis/apis.jsx

export const GETALLAPISEXPORTS=()=>{

    const URI = process.env.WEB_URI

    const getContinents=async()=>{
        let data = await fetch(`${URI}/api/v1/continents/get`,{ cache: 'no-store' });
        let res = await data.json();
        return res;
    }

    const getCountries=async()=>{
        let data = await fetch(`${URI}/api/v1/countries/get`,{ cache: 'no-store' });
        let res = await data.json();
        return res;
    }

    const getCities=async()=>{
        let data = await fetch(`${URI}/api/v1/cities/get`,{ cache: 'no-store' });
        let res = await data.json();
        return res;
    }
    const getPackages=async()=>{
        let data = await fetch(`${URI}/api/v1/packages/get`,{ cache: 'no-store' });
        let res = await data.json();
        return res;
    }
    
    const getContacts=async()=>{
        let data = await fetch(`${URI}/api/v1/sendquery/queries/get`,{ cache: 'no-store' });
        let res = await data.json();
        return res;
    }
    const getBookings=async()=>{
        let data = await fetch(`${URI}/api/v1/flight/queries/get`,{ cache: 'no-store' });
        let res = await data.json();
        return res;
    }
    return{
        getContinents,
        getCountries,
        getCities,
        getPackages,
        getContacts,
        getBookings
    }

}