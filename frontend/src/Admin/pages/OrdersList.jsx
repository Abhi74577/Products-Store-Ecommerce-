import React, { useContext } from 'react'
import axios from 'axios'
import { SellerContext } from '../../context/SellerContext'
import { GrTapeOption } from "react-icons/gr";
import { ShopContext } from '../../context/ShopContext'
import { toast } from 'react-toastify';
function OrdersList() {
  const { orders, getOrder } = useContext(SellerContext);
  const { currency } = useContext(ShopContext);
  const updateStatus = async (orderId, status) => {
    axios.get(import.meta.env.VITE_API_URL + '/orders/updatestatus',
      {
        params: {
          orderId, status
        },
        headers: {
          Authorization: 'bearer ' + localStorage.getItem('Token')
        }
      }).then((res) => {
        if (res.status == 200) {
          getOrder();
          toast.success(res.data.message)
        }
        else {
          console.error(res.data.message);

        }
        console.log(res.data.orders)

      }).catch((error) => {
        console.error(error)
      })
  }
  return (
    <div className='w-full p-12'>
      <p className='text-lg text-gray-700 mb-2 font-bold'>Order Page</p>
      <div className='flex flex-col gap-10'>
        {
          orders?.map((item, idx) => (

            <div className='flex flex-col  md:grid md:grid-cols-[1fr_4fr_2fr_1fr_2fr] border border-gray-400 p-5 gap-2'>
              <GrTapeOption className='w-10 h-10 text-gray-600' />
              <div className='flex flex-col text-sm text-gray-700 font-medium'>
                {
                  item.cart.map((cartitem, cidx) => (
                    <div key={cidx} className='flex '>
                      <h3>{cartitem.product.name} </h3>
                      <p className='ml-1'> x {cartitem.cart.sizeTotal} {cartitem.cart.size}</p>
                    </div>
                  ))
                }

                <div className='mt-5'>
                  <h1 className='text-sm font-semibold mb-3 text-gray-800'>{item.order.address.firstName} {item.order.address.lastName}</h1>
                  <p>{item.order.address.street}</p>
                  <p>{item.order.address.city} {item.order.address.state}, {item.order.address.country}, {item.order.address.zipCode}</p>
                  <p>{item.order.address.phoneNb}</p>
                </div>
              </div>

              <div className='flex flex-col gap-1 text-sm text-gray-700 font-medium'>
                <p className='mb-3'>Items: {item.cart.length}</p>
                <p>Method: {item.order.paymentMethod}</p>
                <p>Payment: {item.order.payment ? 'Complete' : 'Pending'} </p>
                <p>Date: {new Date(item.order.date).toLocaleTimeString()}</p>
              </div>

              <h2 className='font-bold'>{currency}{item.order.amount}</h2>

              <div className='text-sm text-gray-800 font-bold'>
                <select value={item.order.status} onChange={(e) => {updateStatus(item.order._id, e.target.value)}} className='border border-gray-500 p-1 cursor-pointer bg-white' name='orderstatus'>
                  <option value='Order Placed'>Order Placed</option>
                  <option value='Packing'>Packing</option>
                  <option value='Shipped'>Shipped</option>
                  <option value='Out for delivery'>Out for delivery</option>
                  <option value='Delivered'>Delivered</option>
                </select>
              </div>
            </div>


          ))
        }
      </div>

    </div>
  )
}

export default OrdersList
