import { createContext, useState } from "react";


export const SellerContext = createContext({});

export const SellerContextProvider = ({ children }) => {
    const [sellerPrfile, setSellerProfile] = useState({});

    return(
        <SellerContext.Provider value={{ sellerPrfile, setSellerProfile}}>
            {children}
        </SellerContext.Provider>
    )
}