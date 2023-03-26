import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CurrencyContext } from '../context/CurrencyContext'

const Header = () => {

    const {currency,setcurrency} = useContext(CurrencyContext)



    return (
        <nav className="navbar bg-primary " data-bs-theme="dark">
            <div className="container">
                <Link to={"/"} className="navbar-brand fs-4">Crypto Falcon</Link>
                <div className="d-flex" >
                    <select className="form-select me-3" aria-label="Default select example" data-bs-theme="light"
                     value={currency} onChange={(e)=>setcurrency(e.target.value)}>
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                    </select>
                    {/* <button className="btn btn-outline-success btn-light " type="submit">Login</button> */}
                </div>
            </div>
        </nav>
    )
}

export default Header