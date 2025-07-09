import { createContext, useEffect, useState } from "react";
// import { products } from '../shared/data'
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import axios from "axios";
export const ShopContext = createContext({});

export const ShopContextProvider = ({ children }) => {

    const currency = '₹';
    const delivery_fee = 20;
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProducts] = useState('');
    const [search, setSearch] = useState('');
    const [cartItems, setCartItems] = useState({})
    const [profileLocation, setProfileLocation] = useState(localStorage.getItem('Profile') == null ? '' : localStorage.getItem('Profile'));

    const getProducts = async () => {
        await axios.get(import.meta.env.VITE_API_URL + '/products/getproducts'
        ).then((res) => {
            if (res.status == 200) {
                setProducts(res.data.products);

                toast.success(res.data.message);
            } else {
                toast.error(response.data.message)
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    const getCarts = async () => {
        const token = localStorage.getItem('Token');
        if (profileLocation != '' && profileLocation == "Buyer" && token != null) {
            await axios.get(import.meta.env.VITE_API_URL + '/carts/getCart', {
                headers: {
                    Authorization: 'bearer ' + token
                }
            }
            ).then((res) => {
                if (res.status == 200) {
                    console.log('carts', res.data.carts);
                    setCartItems(res.data.carts);
                    getCartCount();
                    // toast.success(res.data.message);
                } else {
                    console.error(response.data.message)
                }
            }).catch((error) => {
                console.error(error)
            })
        } else {
            toast.warning('Please Login First.')
        }

    }

    useEffect(() => {
        getProducts();
        getCarts();
    }, [])

    const addToCart = async (productId, size) => {

        if (size == '') {
            return toast.error('Please select size')
        }

        const token = localStorage.getItem('Token');
        if (profileLocation != '' && profileLocation == "Buyer" && token != null) {
            await axios.post(import.meta.env.VITE_API_URL + '/carts/addcart', {
                productId,
                size,
                sizeTotal: 1
            },
                {
                    headers: {
                        Authorization: 'bearer ' + token
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        getCarts();
                        toast.success(res.data.message);
                    } else {
                        toast.error(res.data.message);
                    }
                }).catch((error) => {
                    console.error(error)
                })
        }
        else {
            return toast.warning('Please Login First.')
        }



        // let copyCart = structuredClone(cartItems);
        // if (copyCart[itemId]) {
        //     if (copyCart[itemId][size]) {
        //         copyCart[itemId][size] += 1
        //     }
        //     else {
        //         copyCart[itemId][size] = 1
        //     }
        // } else {
        //     copyCart[itemId] = {}
        //     copyCart[itemId][size] = 1
        // }
        //setCartItems(copyCart)

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            totalCount = totalCount + cartItems[items].sizeTotal
        }
        // for (const items in cartItems) {
        //     for (const item in cartItems[items]) {
        //         try {
        //             if (cartItems[items][item] > 0) {
        //                 totalCount += cartItems[items][item]
        //             }
        //         } catch (error) {

        //         }

        //     }
        // }
        return totalCount;
    }

    useEffect(() => {
        getCartCount()
    }, [cartItems])

    const updateQuantity = async (cartId, buttonValue) => {
        // let cartData = structuredClone(cartItems);

        // cartData[itemId][size] = quantity;

        // setCartItems(cartData);

        const token = localStorage.getItem('Token');
        if (profileLocation != '' && profileLocation == "Buyer" && token != null) {
            await axios.get(import.meta.env.VITE_API_URL + '/carts/updatesize',
                {
                    params: { cartId, buttonType: buttonValue },
                    headers: {
                        Authorization: 'bearer ' + token
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        getCarts();
                        toast.success(res.data.message);
                    } else {
                        toast.error(res.data.message);
                    }
                }).catch((error) => {
                    console.error(error)
                })
        }


    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find(x => x._id === cartItems[items].productId);

            try {
                if (itemInfo != null) {
                    totalAmount += itemInfo.price * cartItems[items].sizeTotal;
                }
            } catch (error) {
                console.error('Error in getCartAmount:', error);
            }

        }


        // for (const items in cartItems) {
        //     let itemInfo = products.find(x => x._id === items);
        //     for (const item in cartItems[items]) {
        //         try {
        //             if (cartItems[items][item] > 0) {
        //                 totalAmount += itemInfo.price * cartItems[items][item];
        //             }
        //         } catch (error) {
        //             console.error('Error in getCartAmount:', error);
        //         }
        //     }
        // }
        return totalAmount;
    }

    useEffect(() => {
        console.log("cartItems", cartItems)
    }, [cartItems])

    const value = {
        products, setProducts,
        currency,
        delivery_fee, showSearch, setSearch, setShowSearch, search, addToCart, cartItems,
        getCartCount, updateQuantity, getCartAmount, getCarts
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}