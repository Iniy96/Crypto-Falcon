import { TextField, LinearProgress, Pagination } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CurrencyContext } from '../../../context/CurrencyContext'
import { CoinList } from '../../../services/api'

export const HomeBody = () => {

    const [searchedCoin, setsearchedCoin] = useState("")
    const [coinList, setcoinList] = useState([])
    const [progress, setprogress] = useState(false)
    const [page, setpage] = useState(1)

    const { currency, currencySymbol } = useContext(CurrencyContext)

    const fetchCoinListFromApi = async () => {
        setprogress(true)
        const { data } = await axios.get(CoinList(currency))
        setcoinList(data)
        setprogress(false)
    }


    useEffect(() => {
        fetchCoinListFromApi()
    }, [currency])



    const numberWithcommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <div className='container mt-3' style={{ fontFamily: "Montserrat, sans-serif" }}>
            <p className='fs-2 text-center'>Crypto Currency Prices by Market Cap</p>
            <TextField id="outlined-basic" fullWidth label="Search your favourite Coin"
                onChange={(e) => setsearchedCoin(e.target.value)} variant="outlined" />
            <div className='table-responsive'>
                <table className="table my-4 table-hover border-top rounded align-middle">

                    <thead className='text-white bg-primary align-middle' style={{ height: "80px", letterSpacing: "2px" }} >
                        <tr className='fs-5 '>
                            <th scope="col" className='ps-3' >Coin</th>
                            <th scope="col" >Price</th>
                            <th scope="col">24h Change</th>
                            <th scope="col" >Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {progress ? <LinearProgress style={{ backgroundColor: "gold" }}/>
                            : coinList.filter((coin) => {
                                return coin.name.toLowerCase().includes(searchedCoin.toLowerCase()) || coin.symbol.toLowerCase().includes(searchedCoin.toLowerCase())
                            }).slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map((coin) => {
                                    return (
                                        <tr key={coin.id} style={{ height: "90px" }} >
                                            <td className='ps-1'>
                                                    <Link to={`/coin/${coin.id}`}>
                                                <div className=' d-flex text-dark gap-3' >
                                                        <img style={{ height: "50px" }} src={coin.image} />
                                                        <div>
                                                            <div className='fs-5'>{coin.symbol.toUpperCase()}</div>
                                                            <div>{coin.name}</div>
                                                        </div>
                                                </div>
                                                    </Link>
                                            </td>
                                            <td >{currencySymbol} {numberWithcommas(coin.current_price.toFixed(2))}</td>
                                            <td >{
                                                coin.price_change_percentage_24h > 0
                                                    ? <span style={{ color: 'green' }}>+{coin.price_change_percentage_24h.toFixed(2)}%</span>
                                                    : <span style={{ color: 'red' }}>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                                            }</td>

                                            <td >{currencySymbol} {numberWithcommas(coin.market_cap.toString().slice(0, -6))}M</td>

                                        </tr>
                                    )
                                })

                        }
                    </tbody>
                </table>
            </div>
            <Pagination
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                }}
                onChange={(_, value) => {
                    setpage(value);
                    window.scroll(0, 450)
                }}
                count={(coinList.length / 10).toFixed(0)}
            />
        </div>

    )
}
