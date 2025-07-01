import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'
function About() {
  return (
    <div className='px-4 border-t border-gray-50'>
      <div className='my-6 text-xl font-medium text-center'>
        <Title text1={'about'} text2={'us'} />
      </div>

      <div className='flex flex-col sm:flex-row justify-normal sm:justify-between gap-12 items-center '>
        <img src={assets.aboutImg} className='w-full sm:w-[400px] h-[450px] object-cover' alt='about' />
        <div className='md:w-3/4 flex flex-col justify-center gap-5 text-start  text-sm  text-gray-700'>
          <p>Several platforms can help e-commerce businesses with reviews. Trustpilot is a popular option for collecting and displaying reviews, with a focus on transparency and user feedback. Other platforms like Yotpo and Okendo offer more advanced features but come with a higher price </p>
          <p>Several platforms can help e-commerce businesses with reviews. Shopify offers its own free review platform for businesses using their service, though it has limited features. Other platforms like Yotpo and Okendo offer more advanced features but come with a higher price. </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Several platforms can help e-commerce businesses with reviews. Shopify offers its own free review platform for businesses using their service, though it has limited features. Other platforms like Yotpo and Okendo offer more advanced features but come with a higher price. </p>
        </div>
      </div>

      <div className='my-10'>
        <div className='text-xl font-medium text-start'>
          <Title text1={'why'} text2={'choose us'} />
        </div>
        <div className='flex flex-col sm:flex-row items-center justify-normal'>
          <div className='flex flex-col justify-center items-start gap-5 px-10 py-20  border-1 border-gray-400'>
            <h1 className='text-lg font-bold text-gray-800'>Quality Assurance:</h1>
            <p className='text-sm text-gray-700 font-medium'>We meticulously select and vet each product to ensure it meets our strigent quality standards.</p>
          </div>
          <div className='flex flex-col justify-center items-start gap-5 px-10 py-20  border-1 border-gray-400'>
            <h1 className='text-lg font-bold text-gray-800'>Quality Assurance:</h1>
            <p className='text-sm text-gray-700 font-medium'>We meticulously select and vet each product to ensure it meets our strigent quality standards.</p>
          </div>
          <div className='flex flex-col justify-center items-start gap-5 px-10 py-20  border-1 border-gray-400'>
            <h1 className='text-lg font-bold text-gray-800'>Quality Assurance:</h1>
            <p className='text-sm text-gray-700 font-medium'>We meticulously select and vet each product to ensure it meets our strigent quality standards.</p>
          </div>
        </div>
      </div>
      <div className='my-5'>
        <Newsletter />
      </div>


    </div>
  )
}

export default About
