import { LinearProgress } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CurrencyContext } from '../../context/CurrencyContext'
import { SingleCoin } from '../../services/api'
import HistoryChart from './HistoryChart'

const CoinPage = () => {

  const { id } = useParams()

  const [singleCoinData, setsingleCoinData] = useState()

  const { currency, currencySymbol } = useContext(CurrencyContext)

  const fetchSingleCoinDetailFromApi = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setsingleCoinData(data)
  }

  useEffect(() => {
    fetchSingleCoinDetailFromApi()
  }, [])

  const numberWithcommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }


  return (
    <div>
      {
        singleCoinData ? (

          <div className='d-flex ' >
            <div className='col col-lg-4 p-4 border-end'>
              <div className='text-center mt-4'>
                <img src={singleCoinData.image.large} style={{ height: "160px" }} />
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
            </div>
            <div className='col col-8 d-flex justify-content-center align-items-center'>
              <HistoryChart coin={singleCoinData }/>
            </div>
          </div>

        ) : null
      }

    </div>
  )
}

export default CoinPage