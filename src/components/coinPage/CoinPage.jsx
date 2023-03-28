import { LinearProgress } from '@mui/material'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CurrencyContext } from '../../context/CurrencyContext'
import { db } from '../../firebase'
import { SingleCoin } from '../../services/api'
import HistoryChart from './HistoryChart'

const CoinPage = () => {

  const { id } = useParams()

  const [singleCoinData, setsingleCoinData] = useState()

  const { currency, currencySymbol, user, watchlist } = useContext(CurrencyContext)

  const inWatchList = watchlist.includes(singleCoinData?.id)

  const fetchSingleCoinDetailFromApi = async () => {

    const { data } = await axios.get(SingleCoin(id))
    setsingleCoinData(data)

  }

  useEffect(() => {
    fetchSingleCoinDetailFromApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addtoWatchList = async () => {
    const coinRef = doc(db, "watchlist", user.uid)
    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, singleCoinData.id] : [singleCoinData.id]
      })
      alert("Coin Added to watchList")
    } catch (error) {
      alert(error)
    }
  }

  const removeFromWatchlist=async()=>{
    const coinRef = doc(db, "watchlist", user.uid)
    try {
      await setDoc(coinRef, {
        coins: watchlist.filter((watch)=> watch !== singleCoinData?.id),
      },
      {merge:true}
      );
      alert("Coin Removed to watchList")
    } catch (error) {
      alert(error)
    }
  }

  const numberWithcommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <div>
      {
        !singleCoinData ? <div><LinearProgress style={{ backgroundColor: "gold" }} /></div> : (

          <div className='d-flex flex-column flex-lg-row' >
            <div className='col col-lg-3 p-4 pt-0 border-end'>
              <div className='text-center mt-4'>
                <img src={singleCoinData.image.large} style={{ height: "160px" }} alt={""} />
              </div>
              <div className='text-center pt-3 fw-bold fs-1'>{singleCoinData.name}</div>
              <div className='fs-6  ' style={{ fontWeight: "600" }} >{singleCoinData.description.en.split(".")[0]}. </div>
              <div className='mt-4 fs-4 '> <span className='fw-bold'>Rank : </span>&nbsp; {singleCoinData.coingecko_rank}</div>
              <div className='mt-2 fs-4 '> <span className='fw-bold'>Current Price : </span> <nobr>&nbsp;{currencySymbol} {
                numberWithcommas(singleCoinData.market_data.current_price[currency.toLowerCase()])}</nobr>
              </div>
              <div className='mt-2 fs-4 '> <span className='fw-bold'>Market Cap : </span> <nobr> &nbsp;{currencySymbol} {
                numberWithcommas(singleCoinData.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M</nobr>
              </div>
              {
                user && (
                  <div className='mt-2 text-center'>
                    <button className='btn w-75 btn-warning' 
                    onClick={inWatchList? removeFromWatchlist: addtoWatchList}>
                      {inWatchList ? "Remove From WatchList" : "Add to WatchList"}
                    </button>

                  </div>)
              }
            </div>
            <div className='col-12 col-lg-9 p-4 mx-auto ' >
              <div></div>
              <HistoryChart coin={singleCoinData} />
            </div>
          </div>

        )
      }

    </div>
  )
}

export default CoinPage