import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ProfileContext = createContext({});

export const ProfileContextProvider = ({ children }) => {

    const [profileLocation, setProfileLocation] = useState(localStorage.getItem('Profile') == null ? '' : localStorage.getItem('Profile'));
    const [userData, setUserData] = useState('')
     const [sellerData, setSellerData] = useState('')

    const GetProfileDataWithToken = async () => {
        if (profileLocation != '' && profileLocation == "Buyer" && localStorage.getItem('Token') != null) {
            await axios.get(import.meta.env.VITE_API_URL + '/users/profile',
                {
                    headers: { Authorization: 'bearer ' + localStorage.getItem('Token') }
                }).then((response) => {
                    if (response.status == 200) {
                        toast.success(response.data.message)
                        setUserData(response.data.user)
                    } else {
                        toast.error(response.data.message)
                    }
                }).catch((error) => {
                    console.error(error);

                });
        }
        
        if (profileLocation != '' && profileLocation == "Seller" && localStorage.getItem('Token') != null){
            await axios.get(import.meta.env.VITE_API_URL + '/admins/profile',
                {
                    headers: { Authorization: 'bearer ' + localStorage.getItem('Token') }
                }).then((response) => {
                    if (response.status == 200) {
                        toast.success(response.data.message)
                        setSellerData(response.data.profile)
                    } else {
                        toast.error(response.data.message)
                    }
                }).catch((error) => {
                    console.error(error);

                });
        }
    }

    useEffect(() => {
        GetProfileDataWithToken()
    }, [])

    return (
        <ProfileContext.Provider value={{ profileLocation, setProfileLocation, userData, setUserData, sellerData, setSellerData }}>
            {children}
        </ProfileContext.Provider>
    )
}