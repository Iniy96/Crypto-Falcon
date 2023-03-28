import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Login from './Login';
import SignUp from './SignUp';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius:2
};

export const AuthModal = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const googleProvider = new GoogleAuthProvider()
    const signInWithGoogle=()=>{
        signInWithPopup(auth,googleProvider).then(res=>{
            alert("signIn successfull")
            handleClose()
        }).catch((error)=>{
            alert(error)
        })
    }

    return (
        <div>
            <Button onClick={handleOpen} disableElevation variant="contained" color="warning">Login</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} variant="fullWidth" onChange={handleChange} >
                                <Tab label="Login"  />
                                <Tab label="SignUp" />
                            </Tabs>
                        </Box>
                         {value ===0 && <Login handleClose={handleClose}/>}
                        
                        {value ===1 && <SignUp handleClose={handleClose} />}
                        
                    </Box>
                    <Box>
                        <div className='text-center mb-3'>OR</div>
                        <GoogleButton
                            onClick={signInWithGoogle} style={{width:"85%",borderRadius:3,margin:"auto"}}
                        />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
