import axios from 'axios';
import React, { useState } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from 'react-toastify'
function Add() {
  const token = localStorage.getItem('Token')
  const productsizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState([]);
  const [bestseller, setBestSeller] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", productName)
    formData.append("description", productDescription)
    formData.append("price", price)
    formData.append("category", category)
    formData.append("subCategory", subcategory)
    formData.append("sizes", JSON.stringify(size))
    formData.append("bestseller", bestseller)

    image1 && formData.append("image1", image1)
    image2 && formData.append("image2", image2)
    image3 && formData.append("image3", image3)
    image4 && formData.append("image4", image4)

    await axios.post(import.meta.env.VITE_API_URL + '/products/addproduct', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.status == 200) {
        toast.success(res.data.message)
      }
    }).catch((error) => {
      console.error(error);

    })

    setImage1(false)
    setImage2(false)
    setImage3(false)
    setImage4(false)
    setProductName('')
    setProductDescription('')
    setCategory('')
    setSubCategory('')
    setPrice('')
    setSize([])
    setBestSeller(!bestseller)

  }

  return (
    <div className='my-5 felx flex-col justify-start items-center px-4 sm:px-10 '>
      <form onSubmit={handelSubmit}>
        <div className='mb-4'>
          <p className='text-base text-gray-700'>Upload Images</p>
          <div className='flex gap-2 sm:gap-4 mt-1 '>
            <label htmlFor='image1' className='border-2  border-gray-400 bg-white text-gray-500  cursor-pointer '> {image1 ? <img src={URL.createObjectURL(image1)} className='w-10 h-10 sm:w-15 sm:h-18 object-cover opacity-100' /> : <IoCloudUploadOutline className='w-10 h-10 sm:w-15 sm:h-15 px-2' />}
              <input onChange={(e) => { setImage1(e.target.files[0]) }} type="file" id="image1" name="image1" accept="image/png, image/jpeg" placeholder='upload image1' hidden />
            </label>
            <label htmlFor='image2' className='border-2  border-gray-400 bg-white text-gray-500 cursor-pointer '> {image2 ? <img src={URL.createObjectURL(image2)} className='w-10 h-10 sm:w-15 sm:h-18 object-cover opacity-100' /> : <IoCloudUploadOutline className='w-10 h-10 sm:w-15 sm:h-15 px-2' />}
              <input onChange={(e) => { setImage2(e.target.files[0]) }} type="file" id="image2" name="image2" accept="image/png, image/jpeg" placeholder='upload image2' hidden />
            </label>
            <label htmlFor='image3' className='border-2  border-gray-400 bg-white text-gray-500 cursor-pointer '> {image3 ? <img src={URL.createObjectURL(image3)} className='w-10 h-10 sm:w-15 sm:h-18 object-cover opacity-100' /> : <IoCloudUploadOutline className='w-10 h-10 sm:w-15 sm:h-15 px-2' />}
              <input onChange={(e) => { setImage3(e.target.files[0]) }} type="file" id="image3" name="image3" accept="image/png, image/jpeg" placeholder='upload image3' hidden />
            </label>
            <label htmlFor='image4' className='border-2  border-gray-400 bg-white text-gray-500 cursor-pointer '> {image4 ? <img src={URL.createObjectURL(image4)} className='w-10 h-10 sm:w-15 sm:h-18 object-cover opacity-100' /> : <IoCloudUploadOutline className='w-10 h-10 sm:w-15 sm:h-15 px-2' />}
              <input onChange={(e) => { setImage4(e.target.files[0]) }} type="file" id="image4" name="image4" accept="image/png, image/jpeg" placeholder='upload image4' hidden />
            </label>
          </div>
        </div>
        <div className='mb-4'>
          <p className='text-base text-gray-700'>Product Name</p>
          <input className='w-full px-2 py-1 border outline-none border-gray-400 text-sm text-gray-800 bg-white' value={productName} type='text'
            id='name' placeholder='Type here' required onChange={(e) => { setProductName(e.target.value) }} />
        </div>

        <div className='mb-4'>
          <p className='text-base text-gray-700'>Product Description</p>
          <textarea className='w-full px-2 py-1 border outline-none border-gray-400 text-sm text-gray-800 bg-white' id="description" rows="5" cols="33"
            placeholder='Write content here' value={productDescription} onChange={(e) => { setProductDescription(e.target.value) }} />
          {/* <input  type='textarea' id='name' placeholder='Type here' required /> */}
        </div>

        <div className='w-full mb-3 flex flex-wrap justify-between items-center gap-3 '>
          <div className='w-full lg:w-50'>
            <p className='text-base text-gray-700'>Product Category</p>
            <select className='w-full px-2 py-1 border outline-none border-gray-400 text-sm text-gray-700 bg-white cursor-pointer' id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>--Select--</option>
              <option value='Men'>Men</option>
              <option value='Women'>Women</option>
              <option value='Both'>Both</option>
            </select>
          </div>
          <div className='w-full lg:w-50'>
            <p className='text-base text-gray-700'>Product Subcategory</p>
            <select className='w-full px-2 py-1 border outline-none border-gray-400 text-sm text-gray-700 bg-white cursor-pointer' id='subcategory' value={subcategory} onChange={(e) => setSubCategory(e.target.value)} >
              <option value=''>--Select--</option>
              <option value='Watch'>Watch</option>
              <option value='Shirt'>Shirt</option>
              <option value='Shirt'>T-Shirt</option>
              <option value='Pint'>Pants</option>
              <option value='Topware'>Topware</option>
            </select>
          </div>
          <div className='w-full lg:w-30'>
            <p className='text-base text-gray-700'>Product Price</p>
            <input className='w-full px-2 py-1 border outline-none border-gray-400 text-sm text-gray-800 bg-white' type='number' id='price'
              placeholder='Price here' min={0} required value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>
        <div className='mb-4'>
          <p className='text-base text-gray-700'>Product Sizes</p>
          <div className='flex flex-wrap gap-3 mt-1'>
            {productsizes?.map((item, idx) => (
              <button type='button' id='sizes' className={`py-2 px-4 text-center bg-gray-300 cursor-pointer text-sm ${size.includes(item) ? 'border' : ''}`}
                key={idx} onClick={() => setSize(prev => prev.includes(item) ? prev.filter(item => item != item) : [...prev, item])}>{item}</button>
            ))
            }</div>
        </div>

        <div className='mb-4 flex gap-3'>
          <input className='w-3 cursor-pointer' type='checkbox' value={bestseller} onClick={() => setBestSeller(!bestseller)} />  <p className='text-base text-gray-700'>Add a bestseller</p>
        </div>

        <button type='submit' className='px-5 py-1 bg-black text-white text-lg font-medium mt-2 cursor-pointer uppercase'>Add</button>
      </form>
    </div>
  )
}

export default Add
