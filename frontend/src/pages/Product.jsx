import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { ShopContext } from '../context/ShopContext';
import RelatedProduct from '../components/RelatedProduct';
import { useNavigate } from 'react-router-dom';
function Product() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const { products, currency, addToCart, cartItems } = useContext(ShopContext);
  const [product, setProduct] = useState({})
  const [size, setSize] = useState('')
  const [image, setImage] = useState('')
  const [checkBtn, setCheckBtn] = useState(false)
  async function findProduct() {
    if (products != '') {
      products?.map((item) => {

        if (item._id === productId) {
          console.log(item)
          setImage(item.image[0])
          setProduct(item);
          setSize('');
          window.scrollTo(0, 0)
        }
      })
    }

  }

  useEffect(() => {
    findProduct()
  }, [productId, products])

  function sizeUpdateAndBtnChage(productId,item) {
    const nb = item.toString()
    setSize(item)
    if (products != '') {
      const data = cartItems.find(item => item.productId == productId && item.size == nb);
      if (data) {
        setCheckBtn(true);
      }
      else {
        setCheckBtn(false);
      }

    }
  }

  return product ? (
    <div className='w-full border-t-1 border-gray-50 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data  */}
      <div className='flex gap-6 sm:gap-8 lg:gap-16 flex-col sm:flex-row sm:justify-between'>

        {/* product image */}
        <div className='flex  flex-col-reverse gap-3 sm:flex-row  '>
          <div className='flex flex-row gap-2 sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-normal'>
            {
              product?.image?.map((item, index) => (
                <img onClick={() => { setImage(item) }} src={item} key={index} className='w-[60px] h-[70px]  sm:mb-3 cursor-pointer' alt='' />
              ))
            }
          </div>
          <div className='w-[80%] h-[50vh] sm:h-[70vh]'>
            <img src={image} className='w-full h-full' alt='' />
          </div>
        </div>

        {/* product Info */}

        <div className='flex-1 text-sm md:text-lg sm:max-w-[55%]'>
          <h1 className='font-bold  mt-2'>{product.name}</h1>
          <p className='mt-2 sm:mt-5  font-semibold'>{currency}{product.price}</p>
          <p className='mt-2 sm:mt-5  font-normal text-gray-700'>{product.description}</p>
          <h1 className='font-semibold  mt-5'>Select Size</h1>
          <div className='w-full flex flex-row  gap-2 items-center mt-2 '>
            {
              product.sizes?.map((item, idx) => (
                <button className={`py-2 px-3 lg:px-5 text-center bg-gray-400 cursor-pointer text-sm lg:text-lg ${size == item ? 'border' : ''}`} key={idx} onClick={() => sizeUpdateAndBtnChage(product._id,item)}>{item}</button>
              ))
            }
          </div>

          <div className='mt-7'>
            {

             checkBtn ?
                <button className='py-2 px-3 sm:px-6 text-center bg-black cursor-pointer text-white text-sm  uppercase ' onClick={() => { navigate('/cart') }}>Go To Cart</button>
                : <button className='py-2 px-3 sm:px-6 text-center bg-black cursor-pointer text-white text-sm  uppercase ' onClick={() => { addToCart(product._id, size) }}>Add To Cart</button>
            }
          </div>
          <div className='mt-6 text-sm bg-gray-50 font-light flex flex-col gap-1 py-2 px-0.5'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>

      </div>
      {/* description and reviews */}
      <div className='mt-10 sm:mt-30'>
        <div className='flex'>
          <h2 className='py-2 px-4 text-center  border border-gray-200 text-sm cursor-pointer'>Description</h2>
          <h2 className='py-2 px-4 text-center  border border-gray-200 text-sm cursor-pointer'>Reviews(122)</h2>
        </div>
        <div className='flex flex-col gap-1 px-4 py-3 border border-gray-200 text-sm text-gray-700'>
          <p>Typical e-commerce transactions include the purchase of products (such as books ) or services (such as music downloads in the form of digital distribution such as the iTunes Store).</p>
          <p>Contemporary electronic commerce can be classified into two categories. The first category is business based on types of goods sold (involves everything from ordering "digital" content for immediate online consumption, to ordering conventional goods and services, to "meta" services to facilitate other types of electronic commerce). </p>
        </div>
      </div>


      {/* Related Products view */}
      <div className='mt-6'>
        <RelatedProduct category={product.category} subcategory={product.subcategory} />
      </div>


    </div>
  ) : <div className='hidden'></div>
}

export default Product
