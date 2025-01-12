export interface FormData {
    name: string;
    email: string;
}

export interface FormDialogProps {
    open: boolean;
    onClose: () => void;
}

export interface FormErrors {
    fullname: string;
    email: string;
    emailConfirm: string;
}
