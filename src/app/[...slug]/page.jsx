'use client'

import { useEffect, useState } from "react"
import Topbanner from "../_common/layout/topbanner"
import Countrycard from "../(countries)/Components/country_cards"
import Layout from "../_common/layout/layout"
import { EXPORT_ALL_APIS } from "@/utils/apis/api"
import Explorations from "../(cities)/cities/Components/citiesinnercards"

export default function Page({ params }) {
    const { slug } = params
    const slugArray = Array.isArray(slug) ? slug : slug.split('/')
    const [continent, setContinent] = useState(null)
    const [country, setCountry] = useState(null)
    const [slugType, setSlugType] = useState('')
    const [loading, setLoading] = useState(true)
    const api = EXPORT_ALL_APIS()

    const loadData = async () => {
        setLoading(true)
        try {
            if (slugArray.length === 2) {
                const [continentData, countryData] = await Promise.all([
                    api.loadSingleContinent(slugArray[0]),
                    api.loadSingleCountry(slugArray[1])
                ])
                setContinent(continentData)
                setCountry(countryData)
                setSlugType('continent')
            } else if (slugArray.length === 1) {
                const continentData = await api.loadSingleContinent(slugArray[0])
                if (continentData) {
                    setContinent(continentData)
                    setSlugType('continent')
                } else {
                    const countryData = await api.loadSingleCountry(slugArray[0])
                    if (countryData) {
                        setCountry(countryData)
                        setSlugType('country')
                    } else {
                        console.error('No data found for the given slug')
                    }
                }
            }
        } catch (error) {
            console.error('Error loading data:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [slugArray])

    useEffect(() => {
        console.log(`country`)
        console.log(country)
    }, [country])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <Layout>
            {slugArray.length === 2 && slugType === 'continent' && (
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
                    <Explorations slug={slugArray[0]} country={country} />
                </>
            )}
        </Layout>
    )
}
