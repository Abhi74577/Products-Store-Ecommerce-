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

    useEffect(() => {
        getProducts()
    }, [])
    const addToCart = async (itemId, size) => {

        if (size == '') {
            return toast.error('Please select size')
        }

        let copyCart = structuredClone(cartItems);
        if (copyCart[itemId]) {
            if (copyCart[itemId][size]) {
                copyCart[itemId][size] += 1
            }
            else {
                copyCart[itemId][size] = 1
            }
        } else {
            copyCart[itemId] = {}
            copyCart[itemId][size] = 1
        }
        setCartItems(copyCart)

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {

                }

            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find(x => x._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.error('Error in getCartAmount:', error);
                }
            }
        }
        return totalAmount;
    }

    useEffect(() => {
        console.log("cartItems", cartItems)
    }, [cartItems])

    const value = {
        products, setProducts,
        currency,
        delivery_fee, showSearch, setSearch, setShowSearch, search, addToCart, cartItems,
        getCartCount, updateQuantity, getCartAmount
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}