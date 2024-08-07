'use client'

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
            if (slugArray.length === 3) {
                const [continentSlug, countrySlug,citySlug] = slugArray;
                const [continentData, countryData,cityData] = await Promise.all([
                    api.loadSingleContinent(continentSlug),
                    api.loadSingleCity(citySlug)
                ]);
                setContinent(continentData);
                setCountry(countryData);
                setSlugType('continent-country');
            }
            if (slugArray.length === 2) {
                const [continentSlug, countrySlug] = slugArray;
                const [continentData, countryData] = await Promise.all([
                    api.loadSingleContinent(continentSlug),
                    api.loadSingleCountry(countrySlug)
                ]);
                setContinent(continentData);
                setCountry(countryData);
                setSlugType('continent-country');
            } else if (slugArray.length === 1) {
                const slugItem = slugArray[0];
                const continentData = await api.loadSingleContinent(slugItem);
                const countryData = await api.loadSingleCountry(slugItem);

                if (countryData && countryData.success) {
                    setCountry(countryData);
                    setSlugType('country');
                } else if (continentData && continentData.success) {
                    setContinent(continentData);
                    setSlugType('continent');
                } else {
                    console.warn('No data found for:', slugItem);
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
            {slugArray.length === 2 && slugType === 'continent-country' && (
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
                    <Explorations  slug={slugArray[0]} country={country} />
                </>
            )}
            
        </Layout>
    );
}
