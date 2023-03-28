import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CurrencyContext } from '../context/CurrencyContext'
import { AuthModal } from './authentication/AuthModal'
import UserSideBar from './authentication/UserSideBar'

const Header = () => {

    const {currency,setcurrency,user} = useContext(CurrencyContext)



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
                    {
                        user ? <UserSideBar/> : <AuthModal/>
                    }
                    

                    
                </div>
            </div>
        </nav>
    )
}

export default Header