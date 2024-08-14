// // src/app/[...slug]/page.jsx
'use client';



import { useEffect, useState } from "react";
import Topbanner from "../_common/layout/topbanner";
import Countrycard from "../(countries)/Components/country_cards";
import Layout from "../_common/layout/layout";
import { EXPORT_ALL_APIS } from "@/utils/apis/api";
import Explorations from "../(cities)/cities/Components/citiesinnercards";

export default function Page({ params }) {
  const { slug } = params;
  const slugArray = Array.isArray(slug) ? slug : slug.split('/');
  const [continent, setContinent] = useState([]);
  const [country, setCountry] = useState([]);

  const [loading, setLoading] = useState(true);
  const api = EXPORT_ALL_APIS();

  let fetchSingleContinent = async () => {
    let data = await api.loadSingleContinent(slugArray[0])
    setContinent(data)
  }

  let fetchSingleCountry = async () => {
    let data = await api.loadSingleContinent(slugArray[1])
    setCountry(data)
  }



  useEffect(() => {
    fetchSingleContinent()
    fetchSingleCountry()
  }, [slugArray]);

  console.log(slugArray)

  if (slugArray.length === 0) {
    <>
      <Topbanner slug={slugArray[0]} />
      <Countrycard slug={slugArray[0]} continent={continent} />
    </>
  }



  return (
    <Layout>
      {slugArray.length === 2 && slugType === 'continent' && (
        <>
          <Topbanner slug={slugArray[1]} />
          <Explorations
            slug={slugArray[1]}
            country={country}
            continent={continent}
            slugType={slugType}
          />
        </>
      )}
      {slugArray.length === 1 && slugType === 'continent' && (
        <>
          <Topbanner slug={slugArray[0]} />
          <Countrycard slug={slugArray[0]} continent={continent} slugType={slugType} />
        </>
      )}
      {slugArray.length === 1 && slugType === 'country' && (
        <>
          <Topbanner slug={slugArray[0]} />
          <Countrycard slug={slugArray[0]} country={country} slugType={slugType} />
        </>
      )}

     
      {slugArray.length === 1 && (
        <>

          <Topbanner slug={slugArray[1]}  />
          <Explorations
            slug={slugArray[1]}
            country={country}


          />
        </>
      )}


    </Layout>
  );
}
