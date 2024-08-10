'use client'
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
const Bloggallery = ({ slug }) => {
    let api = EXPORT_ALL_APIS()

    let [data, setData] = useState([])

    let fetchSingleBlog = async () => {
        let resp = await api.loadSingleBlog(slug)
        setData(resp)
    }

    useEffect(() => {
        fetchSingleBlog()
    }, [])

    let result=data?data.result:[]



    return (
        <>
        {result===undefined||result===null?('no result found'):(result.map((ele)=>{
            return <div className='overview blog-inner-page' key={ele._id} >

            <div className='summary_slider'>
                <div className="itinerary_inner">
                    <div className='itenary_contact'>
                        <div className='top_summary'>
                            <div className='top_summary_inner'>
                                <h2 className='heading_inner_page'>Top Summary</h2>
                                <p>{ele.blog_overview}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='right_query'>
                        <div className='card_contact'>

                            <div className='question'>
                                <h1>Have a Question?</h1>
                                <p>Do not hesitage to give us a call. We are an expert team and we are happy to talk to you</p>
                                <div className='contact_card'>
                                    <a href='tel:+91 8627814386'>+91 8627814386</a>
                                    <a href='mailto:booking@streetromeo.com'>booking@streetromeo.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        }))}
        
        </>


    );
}; export default Bloggallery;