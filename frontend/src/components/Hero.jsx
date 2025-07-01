import React from 'react'
import { assets } from '../assets/assets'
function Hero() {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400 '>
            {/* Left Section */}
            <div className='w-full sm:w-1/2 flex justify-center items-center py-10 sm:py-0'>
                <div className='text-gray-600'>
                    <div className='flex gap-2 items-center'>
                        <p className='w-8 md:w-11 h-[1.5px] bg-gray-600'></p>
                        <p className='text-sm font-medium md:text-base uppercase'>Our BestSellers</p>
                    </div>
                    <h1 className='text-3xl sm:py-1 lg:text-5xl leading-relaxed raleway'>Lastest Arrivals</h1>
                     <div className='flex gap-2 items-center'>
                        <p className='text-sm font-medium md:text-base uppercase'>Shop Now</p>
                        <p className='w-8 md:w-11 h-[1.5px] bg-gray-600'></p>
                    </div>
                </div>
            </div>

            {/* Right Section */}
                <img className='w-full sm:w-1/2 h-[300px] sm:h-[450px] object-cover ' src={assets.bestSaller}/>
        </div>
    )
}

export default Hero
