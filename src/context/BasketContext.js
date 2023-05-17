import { createContext, useContext, useState,useEffect } from "react";
export const BasketContext=createContext();
export const BasketContextProvider=({children})=>{
    const [basket,setBasket]=useState([]);
    useEffect(() => {
        if (localStorage.getItem("basket")) {
          setBasket(JSON.parse(localStorage.getItem("basket")));
        } else {
          localStorage.setItem("basket", JSON.stringify([]));
        }
    }, []);
    return(
        <BasketContext.Provider value={[basket,setBasket]}>
              {children}
        </BasketContext.Provider>
    )
}
export const useBasketContext =()=>useContext(BasketContext)