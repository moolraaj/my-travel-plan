'use client'

import { useEffect, useState } from "react"
import Topbanner from "../_common/layout/topbanner"
import Countrycard from "../(countries)/Components/country_cards"
import Layout from "../_common/layout/layout"
import { EXPORT_ALL_APIS } from "@/utils/apis/api"
import Explorations from "../(cities)/cities/Components/citiesinnercards"

export default function page({ params }) {
    let { slug } = params
    let api = EXPORT_ALL_APIS()
    let [slugType, setSlugType] = useState('')

    let [continent, setContinent] = useState([])
    let [country, setCountry] = useState([])

    const loadSingleContinent = async () => {
        let resp = await api.loadSingleContinent(slug)
        setContinent(resp)
        setSlugType('continent');
    }

    const loadSingleCountry = async () => {
        let resp = await api.loadSingleCountry(slug)
        setCountry(resp)
        setSlugType('country');
    }


    useEffect(() => {
        loadSingleContinent()
        loadSingleCountry()
    }, [])




    return (
        <>
            <Layout>

                {slugType === 'continent' && (
                    <>
                        <Topbanner slug={slug} />
                        <Countrycard slugType={slugType} slug={slug} continent={continent} />
                    </>
                )}

                {slugType === 'country' && (
                    <>
                        <Topbanner slug={slug} />
                        <Explorations slug={slug} country={country} />
                    </>
                )}


            </Layout>
        </>
    )

}