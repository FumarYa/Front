/* import React, { createContext,useEffect, useState } from "react";
import Data from "Data.js"; 

export const DataContext = createContext();

export const Dataprovider=(props) =>{
    const [productos, setProductos] =useState([])

    useEffect(() => {
        const producto = Data
        setProductos(producto)
    }, [])

    const value = {
        productos : [productos]
    }

    return(
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
} */