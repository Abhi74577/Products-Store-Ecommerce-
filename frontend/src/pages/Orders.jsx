import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios';

function Orders() {
  const token = localStorage.getItem('Token')
  const { products, currency } = useContext(ShopContext);
  const [orderItems, setOrdersItems] = useState([]);
  const getOrder = async () => {
    axios.get(import.meta.env.VITE_API_URL + '/orders/getorder',
      {
        headers: {
          Authorization: 'bearer ' + token
        }
      }).then((res) => {
        if (res.status === 200 || res?.data?.orders) {
          const foundProducts = [];

          res.data.orders.forEach((order) => {
            order.cartItemsData.forEach((item) => {
              const product = products.find(x => x._id === item.productId);
              if (product) {
                foundProducts.push({ product, order_Id: order._id, status: order.status, date: new Date(order.date).toLocaleDateString(), qty: item.sizeTotal, size:item.size });
                console.log('productData', product);
              }
            });
          });

          setOrdersItems(foundProducts); // Now holds an array of all matched products
        }

      }).catch((error) => {

      })
  }

  useEffect(() => {
    getOrder();
  }, [products])


  useEffect(() => {
    console.log(orderItems)
  }, [orderItems, setOrdersItems])

  return (
    <div className='my-10 px-4'>
      <div className='text-xl font-medium mb-2'>
        <Title text1={'my'} text2={'orders'} />
      </div>
      {
        orderItems.length > 0 && orderItems.map((items, index) => {
          let item = items.product
          return (
            <div className='flex flex-col border-t border-gray-400 justify-start gap-4 py-4'>
              <div className='w-full flex flex-col sm:flex-row justify-between sm:items-center gap-4'>
                <div className='flex gap-10  text-gray-600'>
                  <img src={item.image[0]} alt='' className='w-20 h-20' />
                  <div className='flex flex-col gap-2'>
                    <h1 className='text-sm font-semibold'>{item.name}</h1>
                    <div className='flex flex-wrap gap-2 text-sm font-medium text-gray-600'>
                      <p>{currency}{item.price}</p>
                      <p>Quantity : {items.qty}</p>
                      <p>Size: {items.size}</p>
                    </div>
                    <h1 className='text-sm font-medium text-gray-600'>Date: {items.date}</h1>
                  </div>
                </div>
                <div className='flex gap-3 items-center text-gray-600'>
                  <p className='w-3 h-3 border border-gray-400 rounded-full bg-green-300'></p>
                  <p>{items.status}</p>
                </div>

                <div className=' border-gray-400 border outline-none py-1 px-4 text-sm  text-gray-600 font-medium rounded-md'>

                  <p>Track Order</p>
                </div>

              </div>


            </div>
          )
        })
      }
      <div className='border-t border-gray-400'></div>
    </div>
  )
}

export default Orders
