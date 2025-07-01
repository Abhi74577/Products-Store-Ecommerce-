import React, { useState } from 'react'

function Newsletter() {
    const [email, setEmail] = useState('')

    function handerSubmit(e) {
        e.preventDefault()
        setEmail('');
    }
    return (
        <div className='text-center my-10'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
            <p className='text-gray-400 mt-3'>Search from thousands of royalty-free Same Person Different Clothes stock images and video for your next project. Download</p>
            <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto border border-gray-400 pl-3 my-6' onSubmit={(e)=>{handerSubmit(e)}}>
                <input type='email' value={email} className='w-full sm:flex-1 outline-none' required placeholder='Enter your email address' onChange={(e) => {setEmail(e.target.value)}} />
                <button type='submit' className='bg-black text-white text-xs sm:text-lg px-6 py-2 uppercase cursor-pointer'>Subscribe</button>
            </form>
        </div>
    )
}

export default Newsletter
