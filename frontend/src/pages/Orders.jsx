import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

function Orders() {
  const { products, currency } = useContext(ShopContext)

  return (
    <div className='my-10 px-4'>
      <div className='text-xl font-medium mb-2'>
        <Title text1={'my'} text2={'orders'} />
      </div>
      {
        products != '' && products.slice(0, 4)?.map((item, index) => (
          <div className='flex flex-col border-t border-gray-400 justify-start gap-4 py-4'>
            <div className='w-full flex flex-col sm:flex-row justify-between sm:items-center gap-4'>
              <div className='flex gap-10  text-gray-600'>
                <img src={item.image[0]} alt='' className='w-20 h-20' />
                <div className='flex flex-col gap-2'>
                  <h1 className='text-sm font-semibold'>{item.name}</h1>
                  <div className='flex flex-wrap gap-2 text-sm font-medium text-gray-600'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity : 1</p>
                    <p>Size: M</p>
                  </div>
                  <h1 className='text-sm font-medium text-gray-600'>Date: {item.date}</h1>
                </div>
              </div>
              <div className='flex gap-3 items-center text-gray-600'>
                <p className='w-3 h-3 border border-gray-400 rounded-full bg-green-300'></p>
                <p>Ready to ship</p>
              </div>

              <div className=' border-gray-400 border outline-none py-1 px-4 text-sm  text-gray-600 font-medium rounded-md'>
               
                <p>Track Order</p>
              </div>

            </div>


          </div>
        ))
      }
<div className='border-t border-gray-400'></div>
    </div>
  )
}

export default Orders
