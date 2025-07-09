import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link, NavLink } from 'react-router'
import { GoPlusCircle } from "react-icons/go";
import { BsCalendar2Check } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../../context/ProfileContext';
import axios from 'axios';
function Navbar({setToken}) {
    const navigate = useNavigate();
    const { profileLocation, setProfileLocation } = useContext(ProfileContext);
    const token = localStorage.getItem('Token')
    async function logout() {
        await axios.get(import.meta.env.VITE_API_URL + '/admins/logout', {
            headers: {
                Authorization: 'bearer ' + token
            }
        }).then((response) => {
            console.log(response)
            if (response.status == 200) {
                localStorage.removeItem('Token');
                localStorage.setItem('Profile', 'Buyer');
                setToken('');
                setProfileLocation('Buyer')
                navigate('/')
            }
        }).catch((error) => {
            console.error(error);

        })


        // window.location.reload()

    }
    return (<>
        <div className='w-full flex justify-between items-center  font-medium border-b border-gray-500'>
            <Link to='/' className='felx flex-col items-center justify-center'>

                <img src={assets.logo} className='w-25 h-8 object-cover bg-amber-50 cursor-pointer sm:rotate-0 rotate-180' />
                <h2 className='text-sm sm:text-lg font-medium uppercase text-[#265edf]'>SELLER panel</h2>
            </Link>
            <Link to='/'>
                <h2 className='text-sm sm:text-lg text-white border rounded-md bg-blue-600 py-1 px-4 sm:px-6' onClick={() => { logout() }}>Logout</h2>
            </Link>
        </div>

    </>
    )
}

export default Navbar
