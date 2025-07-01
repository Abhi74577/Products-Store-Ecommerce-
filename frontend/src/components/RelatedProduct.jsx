import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'
function RelatedProduct({ category, subcategory }) {
    const { products } = useContext(ShopContext)
    const [relatedProduct, setRelatedProduct] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            let copyProduct = products.slice();

            copyProduct = copyProduct.filter(x => x.category === category);
            copyProduct = copyProduct.filter(x => x.subcategory === subcategory);

            console.log(copyProduct.slice(0, 5));
            setRelatedProduct(copyProduct.slice(0, 5))
        }

    }, [products, category, subcategory])
    return relatedProduct.length != 0 ? (
        <>
         <div className='text-center py-8 text-3xl'>
                <Title text1={'Related'} text2={'Collection'} />
               
            </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            relatedProduct?.map((item) => (
                 <ProductItem id={item._id} image={item.images} name={item.category} price={item.price} key={item._id} />
            ))
        }
        </div></>
    ) : <div className='hidden'></div>
}

export default RelatedProduct
