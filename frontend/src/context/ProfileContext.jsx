import { createContext } from "react";

export const ProfileContext = createContext({});

export const ProfileContextProvider = ({ children }) => {


    return(
        <ProfileContext.Provider>
            {children}
        </ProfileContext.Provider>
    )
}