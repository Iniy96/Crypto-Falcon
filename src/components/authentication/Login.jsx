import { Box, Button, TextField } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../../firebase'

const Login = ({handleClose}) => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const handlesubmit=async()=>{
        if(!email || !password){
            alert("Fill All the Fields")
        }else{
            try {
                await signInWithEmailAndPassword(auth,email,password)
                alert(`Login Successful. Welcome ${email}`)
                handleClose()
            } catch (error) {
                alert(error)
            }
        }
    }
    


  return (
    <Box p={3}
    style={{display:"flex",flexDirection:'column',gap:"20px"}}>
        <TextField
        variant='outlined'
        type="email"
        label="Enter Email" value={email}
        onChange={e=> setemail(e.target.value)}
        fullWidth 
        />
        <TextField
        variant='outlined'
        type="password"
        label="Enter Password" value={password}
        onChange={e=> setpassword(e.target.value)}
        fullWidth 
        />
        
        <Button
        variant='contained'
        size='large'
        
        style={{backgroundColor:"#EE8C1D"}}
        onClick={handlesubmit}>Login</Button>
        
    </Box>
  )
}

export default Login