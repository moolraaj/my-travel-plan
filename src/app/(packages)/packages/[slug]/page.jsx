'use client'
import TravelGallery from "./components/slider";
import Layout from "@/app/_common/layout/layout";
import Itinerary from "./components/overview";

export default function page({params}) {
  let {slug}=params
 
 
  return (
    <div>
      <Layout>
      <TravelGallery />
      <Itinerary/>
      </Layout>
    </div>
  );
}
