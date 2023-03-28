import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import { CurrencyContext } from '../../../context/CurrencyContext';
import { TrendingCoins } from '../../../services/api';

const Carousel = () => {

    const { currency, currencySymbol } = useContext(CurrencyContext)

    const [trendingCoins, settrendingCoins] = useState([])

    const fetchTrendingCoinsFromApi = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        settrendingCoins(data)
    }

    useEffect(() => {
        fetchTrendingCoinsFromApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    const items = trendingCoins.map((coin) => {

        const numberWithcommas = (num) => {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        return (
            <Link to={`/coin/${coin.id}`}  >
                <img src={coin.image} style={{ height: "70px" }} alt={""}/>
                <p className='fs-6 mt-3 text-white'>{coin.symbol} <span>{
                    coin.price_change_percentage_24h > 0
                        ? <span style={{ color: 'green' }}>+{coin.price_change_percentage_24h.toFixed(2)}%</span>
                        : <span style={{ color: 'red' }}>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                }</span></p>
                <p className='text-white fs-6'>{currencySymbol} {numberWithcommas(coin.current_price.toFixed(2))}</p>
            </Link>
        )
    })

    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 5
        }
    }

    return (
        <div className='pt-3' style={{backgroundColor:"rgba(255,255,255,0.1)"}}>

            <AliceCarousel mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                responsive={responsive}
                autoPlay items={items}
                disableButtonsControls />
        </div>
    )
}

export default Carousel