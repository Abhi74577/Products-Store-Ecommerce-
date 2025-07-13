import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

function PlaceOrder() {
  const token = localStorage.getItem('Token')
  const navigate = useNavigate();
  const { products, currency, cartItems, updateQuantity, getCarts, getCartAmount, delivery_fee } = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNb: ''
  });


  const onChangeHandler = (event) => {
    let name = event.currentTarget.name;
    let value = event.currentTarget.value

    setFormData(data => ({ ...data, [name]: value }))
  }


  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const orderItems = [];

      for (const items in cartItems) {
        orderItems.push({_id:cartItems[items]._id})
      }

      console.log('orderItems', orderItems)

      let orderData = {
        items: orderItems,
        address: formData,
        amount: getCartAmount() + delivery_fee,
      }

      switch (paymentMethod) {
        case "cod":

         await axios.post(import.meta.env.VITE_API_URL + '/orders/placeOrder', orderData,
            {
              headers: {
                Authorization: 'bearer ' + token
              }
            }).then((res) => {
              console.log(res)
              if (res.status == 200) {
                setFormData({});
                navigate('/orders')
              }
              else {
                console.log(res)
                // navigate('/login')
              }
            }).catch((error) => {
              console.error(error);

            })

          break;

        default:
          break;
      }



    } catch (error) {

    }
  }



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between  my-15 px-6 gap-10'>

      {/* left side */}
      <div className='flex flex-col  gap-4 w-full sm:w-[480px]'>
        <div className='text-xl font-medium'>
          <Title text1={'delivery'} text2={'information'} />
        </div>
        <div className='flex gap-4'>
          <input type='text' name='firstName' value={formData.firstName} onChange={onChangeHandler}
            className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='First Name' />
          <input type='text' name='lastName' value={formData.lastName} onChange={onChangeHandler}
            className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='Last Name' />
        </div>
        <input type='email' name='email' value={formData.email} onChange={onChangeHandler}
          className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='Eamil address' />
        <input type='text' name='street' value={formData.street} onChange={onChangeHandler}
          className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='Street' />
        <div className='flex gap-4'>
          <input type='text' name='city' value={formData.city} onChange={onChangeHandler} className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='City' />
          <input type='text' name='state' value={formData.state} onChange={onChangeHandler}
            className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='State' />
        </div>
        <div className='flex gap-4'>
          <input type='number' name='zipCode' value={formData.zipCode} onChange={onChangeHandler}
            className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='Zipcode' />
          <input type='text' name='country' value={formData.country} onChange={onChangeHandler}
            className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='Country' />
        </div>
        <input type='number' name='phoneNb' value={formData.phoneNb} onChange={onChangeHandler}
          className='w-full border-gray-400 border outline-none py-1 px-4 text-sm sm:text-lg text-gray-600 font-medium rounded-md' placeholder='Phone' min={0} />
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
              <p className={`w-3 h-3 border-1 border-gray-500 rounded-full ${paymentMethod === 'strip' ? 'bg-green-400' : 'bg-white'}`} onClick={() => setPaymentMethod('strip')}></p>
              <p className='text-sm font-bold text-blue-900 text-center italic'>Strip</p>
            </div>
            <div className='flex justify-between items-center gap-3 border-1 border-gray-400 rounded-md px-[13px] sm:px-[20px] py-1 cursor-pointer'>
              <p className={`w-3 h-3 border-1 border-gray-500 rounded-full ${paymentMethod === 'razorpay' ? 'bg-green-400' : 'bg-white'}`} onClick={() => setPaymentMethod('razorpay')}></p>
              <p className='text-sm font-bold text-blue-900 text-center italic'>Razorpay</p>
            </div>
            <div className='flex justify-between items-center gap-3 border-1 border-gray-400 rounded-md px-[13px] sm:px-[20px] py-1 cursor-pointer'>
              <p className={`w-3 h-3 border-1 border-gray-500 rounded-full ${paymentMethod === 'cod' ? 'bg-green-400' : 'bg-white'}`} onClick={() => setPaymentMethod('cod')}></p>
              <p className='text-sm font-medium text-blue-900 text-center uppercase'>cash on delivery</p>
            </div>
          </div>
        </div>
        <div className='w-full text-end'>
          {/* onClick={() => navigate('/orders')} */}
          <button className='px-3 py-2 text-center bg-black text-white text-xs uppercase cursor-pointer'>place order</button>
        </div>
      </div>



    </form>
  )
}

export default PlaceOrder
