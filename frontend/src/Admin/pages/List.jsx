import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify'
import { ShopContext } from '../../context/ShopContext'
import { RiDeleteBin5Line } from "react-icons/ri";
function List() {
  const { currency } = useContext(ShopContext)
  const token = localStorage.getItem('Token')
  const [products, setProducts] = useState('')

  const getAllProduct = async () => {
    await axios.get(import.meta.env.VITE_API_URL + '/products/getallproduct',
      {
        headers: { Authorization: 'bearer ' + token }
      }).then((res) => {
        if (res.status == 200) {
          setProducts(res.data.products);

          toast.success(res.data.message);
        }
      }).catch((error) => {
        console.error(error);

      })
  }

  const removeProduct = async (id) => {
    await axios.get(import.meta.env.VITE_API_URL + '/products/removeproductbyId',
      {
        params: { productId: id },
        headers: {
          Authorization: `bearer ${token}`
        }
      }
    ).then((res => {
      if (res.status == 200) {
        getAllProduct()
        toast.success(res.data.message);
      }
    })).catch((error) => {
      console.error(error);
    })
  }

  useEffect(() => {
    getAllProduct()
  }, [])
  return (<>
    <div className='inline-flex gap-2 items-center my-5 justify-center  py-1 px-5'>
      <h2 className='text-sm lg:text-2xl font-semibold text-gray-800 uppercase'>All Product List</h2>
      <p className='w-8 sm:w-10 h-0.5 bg-gray-800'></p>
    </div>
    <div className='flex flex-col gap-2 px-5 my-3'>

      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-100 text-lg'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>

      {/* produts list */}

      {
        products != "" && products.map((item, index) => (<>
          <div key={index} className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-100 text-sm lg:text-lg text-gray-700' >
            <img src={item.image[0]} className='w-16 h-16 object-center' alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p className='text-sm font-bold'>{currency}{item.price}</p>
            <p className='cursor-pointer' onClick={() => removeProduct(item._id)}><RiDeleteBin5Line /></p>
          </div>

          <div key={index} className='flex-block md:hidden border border-gray-100 shadow bg-white px-3 py-1 flex justify-between items-center gap-2  text-sm' >
            <img src={item.image[0]} className='w-20 h-20 border rounded-md border-gray-100 object-center ' alt="" />
            <div className='flex flex-col justify-start items-center'>

              <p className='text-sm'>{item.subCategory}</p>
              <p>{item.category}</p>

            </div>
            <p className='text-sm font-bold'>{currency}{item.price}</p>
            <p className='cursor-pointer' onClick={() => removeProduct(item._id)}><RiDeleteBin5Line /></p>
          </div>
        </>
        ))
      }
    </div>
  </>
  )
}

export default List
