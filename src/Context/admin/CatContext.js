import React, { createContext} from "react";



export const CatContext = createContext();

export const CatStorage = ({ children }) => {



    return (
        <CatContext.Provider>
            {children}
        </CatContext.Provider>
    )
}