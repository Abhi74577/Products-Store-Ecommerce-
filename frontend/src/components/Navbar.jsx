import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router'
import { LuShoppingCart } from "react-icons/lu";
import { LuUsersRound } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { RiMenuFoldLine } from "react-icons/ri";
import { RiCloseLargeLine } from "react-icons/ri";
import { ShopContext } from '../context/ShopContext';
import { ProfileContext } from '../context/ProfileContext';
import './user.css'
function Navbar({setToken}) {
    const { setShowSearch, getCartCount } = useContext(ShopContext);
    const { profileLocation, setProfileLocation, userData, setUserData } = useContext(ProfileContext);
    const [isMenu, setIsMenu] = useState(false);
    const [isSmPopup, setIsSmPopup] = useState(false);
    console.log("userdat", userData)
    function GotoSeller() {
        localStorage.removeItem('Token');
        localStorage.setItem('Profile', 'Seller');
        setProfileLocation('Seller');
        setUserData('');
        setToken('')
        // window.location.reload()

    }
    return (
        <div className='flex justify-between items-center py-2 font-medium '>
            <NavLink to='/'>

                <img src={assets.logo} className='w-30 h-15 object-cover bg-amber-50 cursor-pointer' />
            </NavLink>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700' onClick={() => setIsSmPopup(false)}>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p className='uppercase'>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p className='uppercase'>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p className='uppercase'>about</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p className='uppercase'>Contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

                </NavLink>

            </ul>

            <div className='flex items-center gap-5'>
                <FiSearch className='text-xl sm:text-[22px] cursor-pointer' onClick={() => { setShowSearch(true) }} />

                <div className='hidden sm:block group relative'>
                    {userData == '' ? <Link to='login'><LuUsersRound className='text-xl sm:text-[22px] cursor-pointer' /></Link> :
                        <p className='cursor-pointer hover:text-black text-sm sm:text-base'>{userData.name}</p>
                    }
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-35 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p className='cursor-pointer hover:text-black text-sm'>My Profile</p>
                            <p className='cursor-pointer hover:text-black text-sm'>Orders</p>
                            <p className='cursor-pointer hover:text-black text-sm'>Logout</p>
                            <p className='cursor-pointer hover:text-black text-sm' onClick={() => { GotoSeller() }}>Become a Seller</p>
                        </div>
                    </div>
                </div>

                <div className='block sm:hidden relative'>
                    {userData == '' ? <LuUsersRound className='text-xl sm:text-[22px] cursor-pointer' onClick={() => setIsSmPopup(!isSmPopup)} /> :
                        <p className='cursor-pointer hover:text-black text-sm sm:text-base' onClick={() => setIsSmPopup(!isSmPopup)}>{userData.name}</p>
                    }
                    {
                        isSmPopup && <div className='absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-35 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                {userData == '' && <Link to='login'> <p className='cursor-pointer hover:text-black text-sm' onClick={() =>  setIsSmPopup(!isSmPopup)}>Login</p></Link>}
                                <p className='cursor-pointer hover:text-black text-sm'>My Profile</p>
                                <p className='cursor-pointer hover:text-black text-sm'>Orders</p>
                                <p className='cursor-pointer hover:text-black text-sm'>Logout</p>
                                <p className='cursor-pointer hover:text-black text-sm' onClick={() => { GotoSeller() }}>Become a Seller</p>
                            </div>
                        </div>
                    }

                </div>

                <Link to='/cart' className='relative'>
                    <LuShoppingCart className='text-xl sm:text-[22px] min-w-5' />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <RiMenuFoldLine className='text-xl sm:text-[25px] min-w-5 block sm:hidden cursor-pointer' onClick={() => { setIsMenu(true); setIsSmPopup(false) }} />
            </div>


            {isMenu &&
                <div className='w-full absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all sm:text-lg'>
                    <div className='flex flex-col justify-start items-start py-3 px-6 gap-5'>
                        <div className='w-full flex justify-between items-center py-3 gap-5  cursor-pointer'>

                            <img src={assets.logo} className='w-30 h-12 object-cover bg-amber-50' onClick={() => { setIsMenu(false) }} />

                            <RiCloseLargeLine className='text-[20px] hover:text-red-600' onClick={() => { setIsMenu(false) }} />
                        </div>
                        <hr className='w-full h-[2px] bg-gray-700 rounded -mt-3 mb-2' />

                        <NavLink to='/' onClick={() => { setIsMenu(false) }} className='px-6 pl-6 w-full uppercase hover:border-2 rounded border-gray-800 '>
                            Home
                        </NavLink>
                        <NavLink to='/collection' onClick={() => { setIsMenu(false) }} className='px-6 pl-6 w-full uppercase hover:border-2 rounded border-gray-800 '>
                            Collection
                        </NavLink>
                        <NavLink to='/about' onClick={() => { setIsMenu(false) }} className='px-6 pl-6 w-full uppercase hover:border-2 rounded border-gray-800 '>
                            About
                        </NavLink>
                        <NavLink to='/contact' onClick={() => { setIsMenu(false) }} className='px-6 pl-6 w-full uppercase hover:border-2 rounded border-gray-800 '>
                            Contact
                        </NavLink>

                    </div>
                </div>
            }
        </div>


    )
}

export default Navbar
