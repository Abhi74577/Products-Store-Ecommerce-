import React, { useState, useContext, useEffect } from 'react'
import { MdKeyboardArrowUp } from "react-icons/md";
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'
function Collection() {
  const [showFilter, setshowFilter] = useState(false)
  const { products, showSearch, setSearch, setShowSearch, search } = useContext(ShopContext);
  const [finalProducts, setFinalProducts] = useState([])
  const [lstCategory, setLstCategory] = useState([])
  const [lstsubCategory, setLstSubCategory] = useState([])
  const [categoryValue, setCategoryValue] = useState([])
  const [subCategoryvalue, setSubCategoryvalue] = useState([])
  const [sortType, setSortType] = useState('relavent')
  useEffect(() => {
    setFinalProducts(products)

    if (!products) return;
    const data = [...new Set(products.map((item) => item.category))];
    setLstCategory(data);
    console.log(lstCategory);
  }, []);

  function applyFilter() {
    let subdata = [];

    if (categoryValue.length === 0) {
      subdata = [...new Set(products.map((item) => item.subCategory))];
      setSubCategoryvalue([]);
    } else {
      subdata = [
        ...new Set(
          products
            .filter((item) => categoryValue.includes(item.category))
            .map((item) => item.subCategory)
        )
      ];
      setSubCategoryvalue([])
    }
    setLstSubCategory(subdata);
  }

  useEffect(() => {
    applyFilter()
  }, [categoryValue, products]);


  function toggleCategory(e) {
    const value = e.target.value;

    if (categoryValue.includes(value)) {
      const updated = categoryValue.filter(item => item !== value);
      console.log('categoryValue (removing):', updated);
      setCategoryValue(updated);
    } else {
      const updated = [...categoryValue, value];
      console.log('categoryValue (adding):', updated);
      setCategoryValue(updated);
    }
  }

  function sortProduct() {
    let data = finalProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFinalProducts(data.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFinalProducts(data.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    sortProduct();
  }, [sortType])

  useEffect(() => {
    let data = products;
    if(showSearch && search != ''){
      data = products.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (categoryValue.length != 0 || subCategoryvalue.length != 0) {
      data = categoryValue.length != 0 ? products.filter((item) => categoryValue.includes(item.category)) : [];
      data = subCategoryvalue.length != 0 ? products.filter((item) => subCategoryvalue.includes(item.subCategory)) : data.length != 0 ? data : [];

      setFinalProducts(data)
    } else {
      setFinalProducts(data)
    }
  }, [categoryValue, subCategoryvalue, search])

  function toggleSubCategory(e) {
    const value = e.target.value;

    if (subCategoryvalue.includes(value)) {
      const updated = subCategoryvalue.filter(item => item !== value);
      console.log('categoryValue (removing):', updated);
      setSubCategoryvalue(updated);
    } else {
      const updated = [...subCategoryvalue, value];
      console.log('subCategoryvalue (adding):', updated);
      setSubCategoryvalue(updated);
    }
  }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-50'>

      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => { setshowFilter(!showFilter) }} className='my-2 text-xl flex items-center cursor-pointer gap-2
         text-gray-800 uppercase'>Filter
          <MdKeyboardArrowUp className={` ${showFilter ? 'rotate-180' : ''}`} /></p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-4 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block `}>
          <p className='mb-3 text-sm font-medium uppercase'>Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {
              lstCategory?.map((item) => (
                <p className='flex gap-2'>
                  <input className='w-3 cursor-pointer' type='checkbox' value={item} onChange={toggleCategory} />{item}
                </p>
              ))
            }
            {/* <p className='flex gap-2'>
              <input className='w-3 cursor-pointer' type='checkbox' value={'Men'} />Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3 cursor-pointer' type='checkbox' value={'Women'} />Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3 cursor-pointer' type='checkbox' value={'Kids'} />Kids
            </p> */}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-4 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block `}>
          <p className='mb-3 text-sm font-medium uppercase'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {
              lstsubCategory?.map((item) => (
                <p className='flex gap-2'>
                  <input className='w-3 cursor-pointer' type='checkbox' value={item} onChange={(e) => { toggleSubCategory(e) }} />{item}
                </p>
              ))
            }
            {/* <p className='flex gap-2'>
              <input className='w-3 cursor-pointer' type='checkbox' value={'Topwear'} />Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3 cursor-pointer' type='checkbox' value={'Bottomwear'} />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3 cursor-pointer' type='checkbox' value={'Winterwear'} />Winterwear
            </p> */}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className=''>
        <div className='flex justify-between text-base sm:text-xl mb-4 gap-2'>
          <Title text1={'all'} text2={'Collection'} />
          <select id='search' name='search' className='border-2 border-gray-300 h-8 text-sm px-1 cursor-pointer sm:py-1' onChange={(e) => { setSortType(e.target.value) }}>
            <option value="relavent" >Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

          {
            finalProducts?.map((item) => (
              <ProductItem id={item._id} image={item.images} name={item.name} price={item.price} />
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default Collection
