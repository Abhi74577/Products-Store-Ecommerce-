import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
function Contact() {
  return (
    <div className='px-4 border-t border-gray-50'>
      <div className='my-6 text-xl font-medium text-center'>
        <Title text1={'contact'} text2={'us'} />
      </div>

      <div className='flex mt-4 flex-col sm:flex-row justify-center items-start p-4 gap-5'>
        <img src={assets.aboutImg} className='w-full sm:w-[400px] h-[450px] object-cover' />
        <div className='flex flex-col justify-start items-start py-10 sm:px-3 text-gray-700 text-sm font-medium'>
          <h1 className='text-xl text-gray-800 font-semibold'>Our Store</h1>
          <p className='mt-4'>54709 Willlms Station</p>
          <p>Suite 340, India</p>

          <p className='mt-5'>Tel:(442)333-444-44</p>
          <p>Email: admin@gamil.com</p>

          <h1 className='mt-5 text-xl text-gray-800 font-semibold'>Careers at Forever</h1>
          <p className='mt-6'>Learn more about our teams ans job openings.</p>
        </div>
      </div>
    </div>
  )
}

export default Contact
