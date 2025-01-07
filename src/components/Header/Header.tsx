import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from './logo.png';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <img src={logo} alt="Broccoli & Co." />
                    <Typography variant="h6" component="div" sx={{ ml: 1, flexGrow: 1 }}>
                        Broccoli & Co.
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
