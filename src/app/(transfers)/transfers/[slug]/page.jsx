'use client'
import Layout from "@/app/_common/layout/layout";
import Transferslider from "./components/slider";
import Transfercontent from "./components/content";


export default function page({params}) {
  let {slug}=params
 
 
  return (
        <Layout> 
            <div className='inner-w-container'>
              <Transferslider/>
              <Transfercontent/>
            </div>
           
            </Layout>
        
   
  );
}
