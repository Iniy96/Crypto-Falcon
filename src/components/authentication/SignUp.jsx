import { Box, Button, TextField } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../../firebase'

const SignUp = ({ handleClose }) => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    const handlesubmit = async () => {
        if (password !== confirmPassword) {
            alert("Password Not Matched")
        } else {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                alert(`SignUp Successful. Welcome ${email}`)
                handleClose()
            } catch (error) {
                alert(error)
            }
        }
    }

    return (
        <Box p={3}
            style={{ display: "flex", flexDirection: 'column', gap: "20px" }}>
            <TextField
                variant='outlined'
                type="email"
                label="Enter Email" value={email}
                onChange={e => setemail(e.target.value)}
                fullWidth
            />

            <TextField
                variant='outlined'
                type="password"
                label="Enter Password" value={password}
                onChange={e => setpassword(e.target.value)}
                fullWidth
            />
            <TextField
                variant='outlined'
                type="password"
                label="Confirm Password" value={confirmPassword}
                onChange={e => setconfirmPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant='contained'
                style={{ backgroundColor: "#EE8C1D" }}
                onClick={handlesubmit}>SignUp</Button>
        </Box>

    )
}

export default SignUp