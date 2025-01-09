import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Box, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormDialogProps } from '../../types/form';
import { useFormValidation } from '../../hooks/useFormValidation';
import useSendData from '../../hooks/useSendData';
import SuccessDialog from '../SuccessDialog/SuccessDialog';
import { formFields } from './formFields';

const FormDialog: React.FC<FormDialogProps> = ({ open, onClose }) => {
    const { errors, validateForm } = useFormValidation();
    const [sendDataError, setSendDataError] = useState('')
    const { isLoading, success, sendDataRequest, setSuccess } = useSendData();

    const handleSend = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const fullname = formData.get('fullname') as string;
        const email = formData.get('email') as string;
        const emailConfirm = formData.get('emailConfirm') as string;

        if (validateForm(fullname, email, emailConfirm)) {
            try {
                const response = await sendDataRequest({ name: fullname, email });
                if (response === 'Registered') {
                    setSendDataError("");
                    onClose();
                }
            } catch (error) {
                if (error instanceof Error) {
                    setSendDataError(error.message);
                } else {
                    setSendDataError('An unknown error occurred');
                }
            }
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="xs"
                slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.7)' } } }}
            >
                <DialogTitle>Request an Invite</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSend}>
                        {formFields.map(field => (
                            <TextField
                                key={field.id}
                                {...field}
                                margin="dense"
                                fullWidth
                                variant="outlined"
                                error={!!errors[field.name]}
                                helperText={errors[field.name]}
                            />
                        ))}
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
                            {sendDataError && (
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {sendDataError}
                                </Alert>
                            )}
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
            <SuccessDialog
                open={success}
                onClose={() => {
                    setSuccess(false);
                    onClose();
                }}
            />
        </>
    );
};

export default FormDialog;
