import React, { useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import { CurrencyContext } from '../../context/CurrencyContext';
import { Avatar } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';


export default function UserSideBar() {
    const [state, setState] = React.useState({

        right: false,
    });

    const { user, watchlist, coinList, currencySymbol } = useContext(CurrencyContext)

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const logout = () => {
        signOut(auth);
        alert("Loged out")
        toggleDrawer()
    }
    const numberWithcommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const removeFromWatchlist = async (id) => {
        const coinRef = doc(db, "watchlist", user.uid)
        try {
            await setDoc(coinRef, {
                coins: watchlist.filter((watch) => watch !== id),
            },
                { merge: true }
            );
            alert("Coin Removed to watchList")
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            cursor: "pointer",
                            backgroundColor: "green"
                        }
                        }
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div style={{ width: 350 }}>
                            <div className='d-flex  mt-5 flex-column'>
                                <div className='text-center'>

                                    <Avatar
                                        style={{
                                            height: 100,
                                            width: 100,
                                            cursor: "pointer",
                                            backgroundColor: "green",
                                            margin: "auto"
                                        }
                                        }
                                        src={user.photoURL}
                                        alt={user.displayName || user.email}
                                    />
                                    <div className='pt-3'>{user.displayName}</div>
                                    <div className='pt-3'>{user.email}</div>
                                </div>
                            </div>
                            <div className='border p-3 m-4 rounded' style={{ minHeight: 300 }}>
                                <div className='fw-bold text-center'>WatchList</div>
                                <hr />
                                <div className='text-start'>
                                    {
                                        coinList.map((coin,i) => {
                                            if (watchlist.includes(coin.id)) {
                                                return (
                                                    <div key={i} className='my-2 d-flex align-items-center justify-content-between'>
                                                        <div> {coin.name} </div>
                                                        <div>
                                                            {currencySymbol}
                                                            {numberWithcommas(coin.current_price.toFixed(2))}
                                                        </div>
                                                        <button className='btn btn-danger' onClick={() => removeFromWatchlist(coin.id)} >X</button>
                                                    </div>
                                                )
                                            }else{
                                                return null
                                            }
                                        })
                                    }
                                </div>
                            </div>
                            <div className='text-center '> <button onClick={logout} className='btn w-50 btn-warning' >Logout</button> </div>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}