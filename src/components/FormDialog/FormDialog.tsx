import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Box, DialogActions, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useSendData from '../../hooks/useSendData';

interface FormDialogProps {
    open: boolean;
    onClose: () => void;
}

const validEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const FormDialog: React.FC<FormDialogProps> = ({ open, onClose }) => {
    const [fullnameError, setFullnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailConfirmError, setEmailConfirmError] = useState('');
    const { isLoading, success, sendDataError, sendDataRequest, setSuccess } = useSendData();

    const handleSend = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const fullname = formData.get('fullname') as string;
        const email = formData.get('email') as string;
        const emailConfirm = formData.get('emailConfirm') as string;

        let hasError = false;

        if (!fullname) {
            setFullnameError('Full Name is required.');
            hasError = true;
        } else {
            setFullnameError('');
        }

        if (!email) {
            setEmailError('Email Address is required.');
            hasError = true;
        } else if (!validEmail(email)) {
            setEmailError('Invalid email address.');
            hasError = true;
        } else {
            setEmailError('');
        }

        if (!emailConfirm) {
            setEmailConfirmError('Confirm Email Address is required.');
            hasError = true;
        } else if (email !== emailConfirm) {
            setEmailConfirmError('Email addresses do not match.');
            hasError = true;
        } else {
            setEmailConfirmError('');
        }

        if (hasError) {
            return;
        }

        sendDataRequest({ name: fullname, email }).then((responseData) => {
            console.log({ sendDataError, responseData })
            if (responseData === "Registered") {
                onClose();
            }
        })

    };

    const handleSuccessClose = () => {
        setSuccess(false);
        onClose();
    };

    console.log({ isLoading, success, sendDataError, sendDataRequest, setSuccess })
    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="xs" slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.7)' } } }}>
                <DialogTitle>Request an Invite</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSend}>
                        <TextField
                            id="fullname"
                            name="fullname"
                            autoFocus
                            margin="dense"
                            label="Full Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            error={!!fullnameError}
                            helperText={fullnameError}
                        />
                        <TextField
                            id="email"
                            name="email"
                            margin="dense"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <TextField
                            id="emailConfirm"
                            name="emailConfirm"
                            margin="dense"
                            label="Confirm Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                            error={!!emailConfirmError}
                            helperText={emailConfirmError}
                        />
                        <Box mt={2}>
                            <LoadingButton
                                type="submit"
                                color="primary"
                                variant="contained"
                                fullWidth
                                loading={isLoading}
                            >
                                Send
                            </LoadingButton>
                            {sendDataError && <Alert severity="error" sx={{ mt: 2 }}>{sendDataError}</Alert>}
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={success} onClose={handleSuccessClose} maxWidth="xs" sx={{ textAlign: 'center' }} slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.7)' } } }}>
                <DialogTitle>All Done</DialogTitle>
                <DialogContent>
                    Your request has been sent successfully! You will hear from us soon!
                    <DialogActions>
                        <Button fullWidth variant='contained' onClick={handleSuccessClose} color="primary" autoFocus sx={{ mt: 2 }}>
                            OK
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FormDialog;
