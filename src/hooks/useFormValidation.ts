import { useState } from 'react';
import { FormErrors } from '../types/form';

const validEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const useFormValidation = () => {
    const [errors, setErrors] = useState<FormErrors>({
        fullname: '',
        email: '',
        emailConfirm: ''
    });

    const validateForm = (fullname: string, email: string, emailConfirm: string): boolean => {
        const newErrors: FormErrors = {
            fullname: '',
            email: '',
            emailConfirm: ''
        };

        if (!fullname) newErrors.fullname = 'Name is required.';
        if (fullname.length < 3) newErrors.fullname = 'Full name needs to be at least 3 characters long.';
        if (!email) newErrors.email = 'Email Address is required.';
        else if (!validEmail(email)) newErrors.email = 'Invalid email address.';
        if (!emailConfirm) newErrors.emailConfirm = 'Confirm Email Address is required.';
        else if (email !== emailConfirm) newErrors.emailConfirm = 'Email addresses do not match.';

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    return { errors, validateForm };
};
