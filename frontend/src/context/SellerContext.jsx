import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";


export const SellerContext = createContext({});

export const SellerContextProvider = ({ children }) => {
    const [sellerPrfile, setSellerProfile] = useState({});
    const [orders, setOrders] = useState([]);
    const [profileLocation, setProfileLocation] = useState(localStorage.getItem('Profile') == null ? '' : localStorage.getItem('Profile'));
    const getOrder = async () => {
        let token = localStorage.getItem('Token')
        if (profileLocation != '' && profileLocation != "Buyer" && token != null) {
 axios.get(import.meta.env.VITE_API_URL + '/orders/list',
            {
                headers: {
                    Authorization: 'bearer ' + token
                }
            }).then((res) => {
                if (res.status == 200) {
                    setOrders(res.data.orders)
                }
                else{
                    console.error(res.data.message);
                    
                }
                console.log(res.data.orders)

            }).catch((error) => {
                console.error(error)
            })
        }
       
    }

    useEffect(() => {
        getOrder();
    }, [])

    return (
        <SellerContext.Provider value={{ sellerPrfile, setSellerProfile, orders, setOrders, getOrder }}>
            {children}
        </SellerContext.Provider>
    )
}