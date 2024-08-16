'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
 
import { format } from 'date-fns';
import Layout from '../_common/layout/layout';
import Topbanner from '../_common/layout/topbanner';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';

async function MyOrders() {

    const { data: session } = useSession();
    const user_id = session?.user?._id ? session?.user?._id : null;
    console.log(`user_id`)
    console.log(user_id)
    let api = EXPORT_ALL_APIS()

    const [booking, setBookings] = useState([]);

    const fetchAllBookings = async () => {
        if (user_id) {
            try {
                const resp = await api.loadSingleUserbookingsdetails(user_id);
                setBookings(resp.result)

            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
    };

    useEffect(() => {
        fetchAllBookings();
    }, [user_id]);

    console.log('booking');
    console.log(booking);

    let bookings = booking ? booking.bookings : []

    return (
        <>
            <Layout>
                <Topbanner slug="my-orders"/>
                {bookings === null || bookings === undefined ? ('no bookings found') : (

                    bookings?.map((ele) => {
                        const date = format(new Date(ele.createdAt), 'dd MMM yyyy');
                        return <div key={ele._id}>
                            <p>booking id {ele.booking_id}</p>
                            <p>description {ele.description}</p>
                            <p>package id{ele._id}</p>
                            <p> data {date}</p>
                        </div>
                    })
                )}
            </Layout>
        </>
    )
}

export default MyOrders