'use client'
import TravelGallery from "./components/slider";
import Layout from "@/app/_common/layout/layout";
import Itinerary from "./components/overview";
import { EXPORT_ALL_APIS } from "@/utils/apis/api";
import { useEffect, useState } from "react";

export default function page({ params }) {
  let { slug } = params
  let api = EXPORT_ALL_APIS()

  let [data, setData] = useState([])

  let fetchSinglePackgedetails = async () => {

    let resp = await api.loadSinglePackage(slug)
    setData(resp)
  }

  useEffect(() => {
    fetchSinglePackgedetails()
  }, [])

   let result=data?data.result:[]






  return (
    <div>
      <Layout>

        <TravelGallery result={result}/>
        <Itinerary result={result}/>

      </Layout>
    </div>
  );
}
