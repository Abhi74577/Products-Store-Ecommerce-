import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
function BestSaller() {
    const { products } = useContext(ShopContext);
    const [listbestSellar, setListBestSeller] = useState([]);
    useEffect(() => {
        if (products != '') {
            let bestsallerProduct = products.filter(x => x.bestseller == true);
            setListBestSeller(bestsallerProduct.slice(5, 10));
        }

    }, [products])
    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'Best'} text2={'Sellers'} />
                <p className='w-[70%] text-xs  mx-auto  sm:text-lg md:text-base text-gray-600'>
                    lad you're here! Check out our sample code, quick start guides, and API reference documentation. You can try our APIs for free and with no registration with our Playgrounds.
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
                {
                    listbestSellar?.map((item) => (
                        <ProductItem id={item._id} image={item.image} name={item.category} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSaller
