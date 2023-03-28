import { CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { CurrencyContext } from '../../context/CurrencyContext'
import { HistoricalChart } from '../../services/api'


Chart.register()

const HistoryChart = ({coin}) => {

    const [historicalData, sethistoricalData] = useState()
    const [days,setdays] =useState(1)

    const {currency}=useContext(CurrencyContext)

    const fetchHistoricDataFromApi=async()=>{
        const {data}= await axios.get(HistoricalChart(coin.id,days,currency))
        sethistoricalData(data.prices);
    }

    useEffect(() => {
      fetchHistoricDataFromApi()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency,days])
    

  return (
    <div>{
        !historicalData ? <CircularProgress
        style={{color:"gold"}} size={250} thickness={1} />
        : <div >
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
                {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
            ]
        }}
        options={{
            elements:{
                point:{
                    radius:1,
                }
            }
        }}
         
        />
        <div className='container d-flex justify-content-center gap-4'>
            <button onClick={()=> setdays(1)} className='btn btn-warning'>24 hours</button>
            <button onClick={()=> setdays(30)} className='btn btn-warning'>30 days</button>
            <button onClick={()=> setdays(90)} className='btn btn-warning'>90 days</button>
            <button onClick={()=> setdays(365)} className='btn btn-warning'>365 days</button>
        </div>
        </div>
        }</div>
  )
}

export default HistoryChart