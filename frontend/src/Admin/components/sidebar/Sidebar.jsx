import React from 'react'
import { Link, NavLink } from 'react-router'
import { GoPlusCircle } from "react-icons/go";
import { BsCalendar2Check } from "react-icons/bs";
import './admin.css'
function Sidebar() {
    return (

        <div className='w-[40px] sm:w-[180px] md:w-[200px] h-full border-r border-gray-500 transition duration-75 ease-in-out'>
            <div className='w-full flex flex-col items-center gap-5 active_css'>
                {/* <div className=''> */}
                <NavLink
                    to='/add'
                    className={({ isActive }) =>
                        `${isActive ? 'text-sm lg:text-lg font-bold bg-blue-600 text-white' : 'text-sm lg:text-lg text-gray-800 sm:text-gray-700'} w-full border-t border-b sm:border sm:px-3 md:px-5 mt-5 py-1.5 
                        border-gray-400 flex justify-center sm:justify-start items-center gap-2 active_change`
                    }
                >
                    <p className='text-[20px] sm:text-lg text-center'><GoPlusCircle /></p>
                    <p className='hidden sm:block text-[16px] '>Add Items</p>
                </NavLink>
                {/* </div> */}
                {/* <div className='w-full border-t border-b sm:border sm:px-3 md:px-5 py-1.5  border-gray-400'> */}
                 <NavLink
                    to='/list'
                    className={({ isActive }) =>
                        `${isActive ? 'text-sm lg:text-lg font-bold bg-blue-600 text-white' : 'text-sm lg:text-lg text-gray-700'} w-full border-t border-b sm:border sm:px-3 md:px-5  py-1.5 
                        border-gray-400 flex justify-center sm:justify-start items-center gap-2 active_change`
                    }
                >
                    <p className='text-[20px] sm:text-lg text-center '><BsCalendar2Check /></p>
                     <p className='hidden sm:block text-[16px] '>Product List</p>
                </NavLink>
                {/* </div> */}

                <NavLink to='/product-order'  className={({ isActive }) =>
                        `${isActive ? 'text-sm lg:text-lg font-bold bg-blue-600 text-white' : 'text-sm lg:text-lg text-gray-700'} w-full border-t border-b sm:border sm:px-3 md:px-5 py-1.5 
                        border-gray-400 flex justify-center sm:justify-start items-center gap-2 active_change`
                    }>
                    <p className='text-[20px] sm:text-lg text-center '><BsCalendar2Check /></p> 
                    <p className='hidden sm:block text-[16px] '>Orders</p>
                </NavLink>


            </div>
        </div>
    )
}

export default Sidebar
