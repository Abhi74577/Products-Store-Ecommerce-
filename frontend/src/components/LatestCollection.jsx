import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
function LatestCollection() {
    const { products } = useContext(ShopContext);
    const [latestProduct, setLatestProduct] = useState([]);

    useEffect(() => {
        setLatestProduct(products.slice(0, 10));
    }, [])
    console.log(products)
    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'Latest'} text2={'Collection'} />
                <p className='w-[70%] text-xs  mx-auto  sm:text-lg md:text-base text-gray-600'>
                    lad you're here! Check out our sample code, quick start guides, and API reference documentation. You can try our APIs for free and with no registration with our Playgrounds.
                </p>
            </div>

            {/* Rendering Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
                {
                    latestProduct?.map((item) => (
                        <ProductItem id={item._id} image={item.images} name={item.category} price={item.price} />
                ))
                }
            </div>


        </div>
    )
}

export default LatestCollection
