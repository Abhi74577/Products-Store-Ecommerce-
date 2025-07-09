import React, {useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router';
function ProductItem( { id, image, name, price }) {
    const { currency } = useContext(ShopContext);
  return (
    <Link className='text-gray-700 cursor-pointer ' to={`/product/${id}`} key={id}>
        <div className='overflow-hidden h-[200px] sm:h-[250px]'>
            <img className='hover:scale-110 transition ease-in-out  w-full h-full' src={image[0]} alt="" />
        </div>
        <p className='pt-1 pb-[1px] text-sm px-2'>{name}</p>
        <p className='text-sm font-semibold px-2'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
