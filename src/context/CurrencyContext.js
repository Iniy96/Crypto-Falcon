import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

export const CurrencyContext = createContext(null);

const CurrencyContextProvider = (props) => {

    const [currency, setcurrency] = useState("INR")
    const [currencySymbol, setcurrencySymbol] = useState("₹")
    const [coinList, setcoinList] = useState([])
    const [progress, setprogress] = useState(false)
    const [user, setuser] = useState(null)
    const [watchlist, setwatchlist] = useState([])

    useEffect(()=>{
        if(user){
            const coinRef = doc(db, "watchlist", user.uid)

           var unsubscribe= onSnapshot(coinRef,coin=>{
                if(coin.exists()){
                    setwatchlist(coin.data().coins)
                }else{
                    console.log("No items in the watchlist ");
                }
            })
            return ()=>{
                unsubscribe()
            }
        }
    },[user])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setuser(user)
            else setuser(null)
        })
    }, [])

    useEffect(() => {
        currency === "INR" ? setcurrencySymbol("₹") : setcurrencySymbol("$")
    }, [currency])

    const providerValues = { currency, setcurrency, currencySymbol, coinList, setcoinList, progress, setprogress, user, watchlist }

    return <CurrencyContext.Provider value={providerValues}  >{props.children}</CurrencyContext.Provider>
}

export default CurrencyContextProvider;