import { Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material';
import { FormDialogProps } from '../../types/form';

const SuccessDialog: React.FC<FormDialogProps> = ({ open, onClose }) => (
    <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        sx={{ textAlign: 'center' }}
        slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.7)' } } }}
    >
        <DialogTitle>All Done</DialogTitle>
        <DialogContent>
            Your request has been sent successfully! You will hear from us soon!
            <DialogActions>
                <Button
                    fullWidth
                    variant='contained'
                    onClick={onClose}
                    color="primary"
                    autoFocus
                    sx={{ mt: 2 }}
                >
                    OK
                </Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
);

export default SuccessDialog;
