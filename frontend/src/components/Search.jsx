import React, { useContext, useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { ShopContext } from '../context/ShopContext'
import { RiCloseLargeLine } from "react-icons/ri";
import { useLocation } from 'react-router';
function Search() {
    const { showSearch, setSearch, setShowSearch, search } = useContext(ShopContext);
    const location = useLocation();
    const [searchboxVisible, setSearchboxVisible] = useState(false);

    useEffect(() => {
        if(location.pathname == '/collection'){
            setSearchboxVisible(true)
        }
        else{
             setSearchboxVisible(false)
        }
    }, [location]);


    return showSearch && searchboxVisible ? (
        <div className='border-t border-b bg-gray-50 border-gray-50 text-center mx-2'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input value={search} onChange={(e) => { setSearch(e.target.value) }} className='flex-1 outline-none bg-inherit text-sm' type='text' placeholder='Search' />
                <FiSearch className='text-lg' />
            </div>
            <RiCloseLargeLine onClick={() => { setShowSearch(false);setSearch('') }} className='text-lg inline cursor-pointer ' />
        </div>
    ) : null
}

export default Search
