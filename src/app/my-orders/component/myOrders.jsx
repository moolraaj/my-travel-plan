'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import Topbanner from '@/app/_common/layout/topbanner';
import Layout from '@/app/_common/layout/layout';

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
    }, []);


    let bookings = booking ? booking.bookings : []
    let reversedBookings=Array.isArray(bookings)?[...bookings].reverse():[]

    return (
        <>
            <Layout>
                <Topbanner slug="my-orders" />
                <div className="my-orders-container">
                    {reversedBookings === null || reversedBookings === undefined ? (
                        <p className="no-bookings">No bookings found</p>
                    ) : (
                        reversedBookings.map((ele) => {
                            const date = format(new Date(ele.createdAt), 'dd MMM yyyy');
                            return (
                                <div key={ele._id} className="booking-card">
                                    <p className="booking-id">Booking ID: {ele.booking_id}</p>
                                    <p className="booking-description">Description: {ele.description}</p>
                                    <p className="booking-package-id">Package ID: {ele._id}</p>
                                    <p className="booking-date">Date: {date}</p>
                                </div>
                            )
                        })
                    )}
                </div>
            </Layout>
        </>
    )
}

export default MyOrders
