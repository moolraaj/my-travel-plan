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
  const [continent, setContinent] = useState(null);
  const [country, setCountry] = useState(null);
  const [slugType, setSlugType] = useState('');
  const [loading, setLoading] = useState(true);
  const api = EXPORT_ALL_APIS();

  const loadData = async () => {
    setLoading(true);
    try {
      if (slugArray.length === 2) {
        // Fetch continent and country
        const [continentData, countryData] = await Promise.all([
          api.loadSingleContinent(slugArray[0]),
          api.loadSingleCountry(slugArray[1])
        ]);

        setContinent(continentData.result || []); 
        setCountry(countryData.result[0] || null); 
        setSlugType('continent');
      } else if (slugArray.length === 1) {
        // Fetch continent or country
        const continentData = await api.loadSingleContinent(slugArray[0]);

        if (continentData.result) {
          setContinent(continentData.result || []);
          setSlugType('continent');
        } else {
          const countryData = await api.loadSingleCountry(slugArray[0]);

          if (countryData.result.length > 0) {
            setCountry(countryData.result[0] || null); 
            setSlugType('country');
          } else {
            console.error('No data found for the given slug');
          }
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [slugArray]);

  if (loading) {
    return <div>Loading...</div>;
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
    </Layout>
  );
}
