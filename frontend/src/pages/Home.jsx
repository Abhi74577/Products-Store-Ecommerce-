import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSaller from '../components/BestSaller'
import OurPolicys from '../components/OurPolicys'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='p-2'>
      <Hero/>
      <LatestCollection/>
      <BestSaller/>
      <OurPolicys/>
      <Newsletter/>
      {/* <Footer/> */}
    </div>
  )
}

export default Home
