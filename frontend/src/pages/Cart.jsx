import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
function Cart() {
  const { products, currency, cartItems, updateQuantity, getCarts } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = [];

    setCartData(cartItems);
  }, [cartItems, cartData,])

  useEffect(() => {
    console.log(cartData)
  }, [cartData])

  async function removeItem(id) {
    const token = localStorage.getItem('Token');
    if (token != null) {
      await axios.get(import.meta.env.VITE_API_URL + '/carts/delteItem',
        {
          params: { cartId: id },
          headers: {
            Authorization: 'bearer ' + token
          }
        }).then((res) => {
          if (res.status == 200) {
            getCarts();
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        }).catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <div className='border-t border-gray-50 pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'Your'} text2={'Cart'} />
      </div>

      <div>
        {
          cartData.length > 0 && cartData?.map((item, index) => {
            const productData = products.find(pro => pro._id === item.productId);

            return (<>
              <div key={index} className='hidden py-4 border-t border-b border-gray-100 text-gray-700 sm:grid grid-cols-[2fr_0.5fr_0.5fr] sm:grid-cols-[3fr_2_fr_0.5fr] justify-center items-center gap-1 sm:gap-4'>
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
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, Number(e.target.value))}
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type='number' min={1} value={item.sizeTotal} defaultValue={item.sizeTotal} />
                <RiDeleteBin6Line className='text-xl hover:cursor-pointer' onClick={() => removeItem(item._id)} />
              </div>

              <div key={index} className='sm:hidden py-4 px-2 border-t border-b border-gray-100 text-gray-700 flex flex-col justify-normal items-center gap-4 sm:gap-4'>
                <div className='w-full flex justify-start items-start gap-5'>
                  <img src={productData.image[0]} className='w-20 object-cover' alt='' />
                  <div className=''>
                    <p className='text-sm sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>Qty:</p> <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, Number(e.target.value))}
                        className='border max-w-8 sm:max-w-20 px-1 sm:px-2 py-0.5' type='number' min={1} value={item.sizeTotal} defaultValue={item.sizeTotal} />
                    </div>
                  </div>

                </div>

                <button className='w-[95%] bg-gray-500 rounded-md text-white text-sm hover:cursor-pointer py-1' onClick={() => removeItem(item._id)}>Remove</button>

                {/* <RiDeleteBin6Line className='' onClick={() => removeItem(item._id)} /> */}
              </div>
            </>)
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
