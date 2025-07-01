import React, { useState } from 'react'
import { BiShieldQuarter } from "react-icons/bi";
import { BiSolidCheckShield } from "react-icons/bi";
import { SlEarphonesAlt } from "react-icons/sl";
import Title from './Title';
function OurPolicys() {

    return (
        <div className='my-10 py-4 text-center'>
            <div className='text-center  text-3xl'>
                <Title text1={'Our'} text2={'Policys'} />
            </div>
            {/* <div className='inline-flex items-center justify-center gap-2'>
                <p className='text-3xl font-medium text-gray-700 uppercase'>Our Policys</p>
                <p className='w-8 sm:w-12 h-[2px] bg-gray-800 '></p>
            </div> */}


            <div className='flex flex-col sm:flex-row gap-12 justify-around sm:gap-2 items-center py-3 mt-4 '>
                <div className='flex flex-col items-center justify-center'>
                    <h3 className='text-4xl mb-3'><BiShieldQuarter className='' /></h3>
                    <h3 className='text-lg font-semibold text-gray-700'>Easy Exchange Policy</h3>
                    <p className='text-gray-400 font-medium'>We offer hassle free exchange policy</p>
                </div>
                <div className='flex flex-col  items-center justify-center'>
                    <h3 className='text-4xl  mb-3'><BiSolidCheckShield className='' /></h3>
                    <h3 className='text-lg font-semibold text-gray-700'>7 day return Policy</h3>

                    <p className='text-gray-400 font-medium'>We provide 7 days return free policy</p>
                </div>
                <div className='flex flex-col  items-center justify-center'>
                    <h3 className='text-3xl  mb-3'><SlEarphonesAlt className='' /></h3>
                    <h3 className='text-lg font-semibold text-gray-700'>Best Customer support</h3>

                    <p className='text-gray-400 font-medium'>We provide 24/7 customer support</p>
                </div>
            </div>
        </div>
    )
}

export default OurPolicys
