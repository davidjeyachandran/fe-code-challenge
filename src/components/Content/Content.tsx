import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import FormDialog from '../FormDialog';

interface ContentProps {
    title: string;
    subtitle: string;
    buttonText: string;
}

const Content: React.FC<ContentProps> = ({ title, subtitle, buttonText }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log('close');
        setOpen(false);
    };

    return (
        <>
            <Box
                component="main"
                sx={{
                    flex: 1,
                    display: 'flex',
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        variant="h2"
                        component="h1"
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mt: 4, mb: 2 }}
                    >
                        {subtitle}
                    </Typography>
                    <Button variant='contained' sx={{ py: 2, px: 6 }} onClick={handleClickOpen}>{buttonText}</Button>
                </Container>
            </Box>
            <FormDialog open={open} onClose={handleClose} />
        </>
    );
};

export default Content;