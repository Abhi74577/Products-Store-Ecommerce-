import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom'
function Cart() {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quntity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems])

  useEffect(() => {
    console.log(cartData)
  }, [cartData])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'Your'} text2={'Cart'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find(pro => pro._id === item._id);

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2_fr_0.5fr] justify-center items-center gap-4'>
                <div className='flex items-start gap-20 '>
                  <img src={productData.image[0]} className='w-20 object-cover' alt='' />
                  <div className=''>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type='number' min={1} defaultValue={item.quntity} />
                <RiDeleteBin6Line className='text-xl hover:cursor-pointer' onClick={() => updateQuantity(item._id, item.size, 0)} />
              </div>
            )
          })
        }
      </div>

      <div className='flex justify-end mt-20 mb-5'>
        <div className='w-full sm:w-[400px]'>
          <CartTotal />
        </div>


      </div>
      <div className='w-full text-end'>
        <button onClick={() => navigate('/place-order')} className='px-3 py-2 text-center bg-black text-white text-xs uppercase cursor-pointer'>procted to checkout</button>
      </div>
    </div>
  )
}

export default Cart
