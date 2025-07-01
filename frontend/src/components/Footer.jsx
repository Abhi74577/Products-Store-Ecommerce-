import React from 'react'
import { assets } from '../assets/assets'
function Footer() {
    return (
        <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm'>
            <div>
                <img src={assets.logo} className='mb-2 w-32 h-25' alt="" />
                <p className='md:w-2/3 text-gray-600'>Search from thousands of royalty-free Same Person Different Clothes stock images and video for your next project. Download
                Search from thousands of royalty-free Same Person Different Clothes stock images and video for your next project. Download</p>
            </div>

            <div>
                <p className='text-xl font-medium mb-4 uppercase'>company</p>
                <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-4 uppercase'>get in touch</p>
             <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-212-444-5555-6666</li>
                    <li>contact@addres.com</li>
                    
                </ul>
            </div>
        </div>
        <div>
            <hr/>
            <p className='text-sm p-5 text-center text-gray-600'>Copyright 2024@ buybestproduct.com All Right Reserved.</p>
        </div>
            
        </div>
    )
}

export default Footer
