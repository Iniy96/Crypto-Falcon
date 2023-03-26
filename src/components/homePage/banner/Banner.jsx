import React from 'react'
import Carousel from './Carousel'

export const Banner = () => {
  return (
    <div className='container-fluid home-banner text-center ' >
        <h1 className=' fw-bold'  >Crypto Falcon</h1>
        <p className='text-white'>Track and get All info about your favourite Crypto coins</p>
        <div className='py-4'>
            <Carousel/>
        </div>
    </div>
  )
}
