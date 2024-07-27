import React from 'react'
import Layout from '@/app/_common/layout/layout'
import Topbanner from '@/app/_common/layout/topbanner'
import Countrycard from '../Components/country_cards'

export default function page() {
  return (
    <Layout>
    <div className='coutryinner'>
      <Topbanner/>
      <Countrycard/>
    </div>
    </Layout>
  )
}
