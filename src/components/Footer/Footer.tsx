import { Box } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: 'black', color: 'white', textAlign: 'center' }}>
            <Box sx={{ my: 6 }}>
                ©{new Date().getFullYear()} Broccoli & Co. All rights reserved.
            </Box>
        </Box>
    )
}

export default Footer