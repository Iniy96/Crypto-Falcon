import { createContext,  useEffect, useState } from "react";

export const CurrencyContext = createContext(null);


const CurrencyContextProvider = (props)=>{

    const [currency, setcurrency] = useState("INR")
    const [currencySymbol, setcurrencySymbol] = useState("₹")

    useEffect(()=>{
        currency === "INR"? setcurrencySymbol("₹"): setcurrencySymbol("$")
    },[currency])

    const providerValues = {currency,setcurrency,currencySymbol}
    return <CurrencyContext.Provider value={providerValues}  >{props.children}</CurrencyContext.Provider>
}

export default CurrencyContextProvider;