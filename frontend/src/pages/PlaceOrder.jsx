import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom'

function PlaceOrder() {
  const [paymentMethod, setPaymentMethod] = useState('')
  const navigate = useNavigate()
  return (
    <div className='flex flex-col sm:flex-row justify-between  my-15 px-6 gap-10'>

      {/* left side */}
      <div className='flex flex-col  gap-4 w-full sm:w-[480px]'>
        <div className='text-xl font-medium'>
          <Title text1={'delivery'} text2={'information'} />
        </div>
        <div className='flex gap-4'>
          <input type='text' className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='First Name' />
          <input type='text' className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='Last Name' />
        </div>
        <input type='email' className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='Eamil address' />
        <input type='text' className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='Street' />
        <div className='flex gap-4'>
          <input type='text' className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='City' />
          <input type='text' className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='State' />
        </div>
        <div className='flex gap-4'>
          <input type='number' className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='Zipcode' />
          <input type='text' className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='Country' />
        </div>
        <input type='number' className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='Phone' min={0} />
      </div>

      {/* Rigth Side  */}

      <div className='flex flex-col mt-15 sm:mt-20 sm:p-10'>
        <div className='w-full md:w-[350px]'>
          <CartTotal />
        </div>


        {/* Payment Option */}
        <div className='my-6'>
          <div className='text-xl font-medium'>
            <Title text1={'payment'} text2={'method'} />
          </div>

          <div className='w-full flex flex-col sm:flex-row sm:flex-wrap justify-between items-start sm:items-center gap-3'>
            <div className='flex justify-between items-center gap-3 border-1 border-gray-400 rounded-md px-[13px] sm:px-[20px] py-1 cursor-pointer'>
              <p className={`w-3 h-3 border-1 border-gray-500 rounded-full ${paymentMethod === 'strip' ? 'bg-green-300' : 'bg-white'}`} onClick={() => setPaymentMethod('strip')}></p>
              <p className='text-sm font-bold text-blue-900 text-center italic'>Strip</p>
            </div>
            <div className='flex justify-between items-center gap-3 border-1 border-gray-400 rounded-md px-[13px] sm:px-[20px] py-1 cursor-pointer'>
              <p className={`w-3 h-3 border-1 border-gray-500 rounded-full ${paymentMethod === 'razorpay' ? 'bg-green-300' : 'bg-white'}`} onClick={() => setPaymentMethod('razorpay')}></p>
              <p className='text-sm font-bold text-blue-900 text-center italic'>Razorpay</p>
            </div>
            <div className='flex justify-between items-center gap-3 border-1 border-gray-400 rounded-md px-[13px] sm:px-[20px] py-1 cursor-pointer'>
              <p className={`w-3 h-3 border-1 border-gray-500 rounded-full ${paymentMethod === 'cod' ? 'bg-green-300' : 'bg-white'}`} onClick={() => setPaymentMethod('cod')}></p>
              <p className='text-sm font-medium text-blue-900 text-center uppercase'>cash on delivery</p>
            </div>
          </div>
        </div>
        <div className='w-full text-end'>
          <button onClick={() => navigate('/orders')} className='px-3 py-2 text-center bg-black text-white text-xs uppercase cursor-pointer'>place order</button>
        </div>
      </div>



    </div>
  )
}

export default PlaceOrder
