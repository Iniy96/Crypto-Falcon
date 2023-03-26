import { CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { CurrencyContext } from '../../context/CurrencyContext'
import { HistoricalChart } from '../../services/api'

const HistoryChart = ({coin}) => {

    const [historicalData, sethistoricalData] = useState()
    const [days,setdays] =useState(1)

    const {currency,currencySymbol}=useContext(CurrencyContext)

    const fetchHistoricDataFromApi=async()=>{
        const {data}= await axios.get(HistoricalChart(coin.id,days,currency))
        sethistoricalData(data.prices);
    }

    useEffect(() => {
     // fetchHistoricDataFromApi()
    }, [currency,days])
    

  return (
    <div>{
        !historicalData ? <CircularProgress
        style={{color:"gold"}} size={250} thickness={1} />
        : <>
        <Line 
        data={{
            labels: historicalData.map((coin)=>{
                let date = new Date(coin[0]);
                let time =
                date.getHours() >12
                ?`${date.getHours()-12}:${date.getMinutes()} PM`
                :`${date.getHours()}:${date.getMinutes()} AM`;

                return days ===1?time: date.toLocaleDateString()
            }),

            datasets:[
                {data: historicalData.map((coin)=> coin[1]) }
            ]
        }}

         
        />
        </>
        }</div>
  )
}

export default HistoryChart