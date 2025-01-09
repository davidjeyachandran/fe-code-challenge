import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FormDialog from './FormDialog';

// Mock the custom hooks
jest.mock('../../hooks/useFormValidation', () => ({
    useFormValidation: () => ({
        errors: {
            fullname: 'Full name is required',
            email: 'Email is invalid',
            emailConfirm: 'Emails do not match'
        },
        validateForm: jest.fn().mockReturnValue(false)
    })
}));

const errorMessage = 'Bad Request: Email is already in use';
jest.mock('../../hooks/useSendData', () => ({
    __esModule: true,
    default: () => ({
        isLoading: false,
        success: false,
        sendDataRequest: jest.fn().mockRejectedValue(new Error(errorMessage))
    })
}));

describe('FormDialog with validation failures', () => {
    const defaultProps = {
        open: true,
        onClose: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders validation errors', async () => {
        render(<FormDialog {...defaultProps} />);

        userEvent.type(screen.getByLabelText(/full name/i), '');
        userEvent.type(screen.getAllByLabelText(/email/i)[0], 'invalid-email');
        userEvent.type(screen.getByLabelText(/confirm email/i), 'different-email@example.com');

        userEvent.click(screen.getByRole('button', { name: /send/i }));

        expect(screen.getByText('Full name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is invalid')).toBeInTheDocument();
        expect(screen.getByText('Emails do not match')).toBeInTheDocument();
    });

    it('does not call sendDataRequest when validation fails', async () => {
        const sendDataRequestMock = require('../../hooks/useSendData').default().sendDataRequest;
        render(<FormDialog {...defaultProps} />);

        userEvent.type(screen.getByLabelText(/full name/i), '');
        userEvent.type(screen.getAllByLabelText(/email/i)[0], 'invalid-email');
        userEvent.type(screen.getByLabelText(/confirm email/i), 'different-email@example.com');

        userEvent.click(screen.getByRole('button', { name: /send/i }));

        await waitFor(() => {
            expect(sendDataRequestMock).not.toHaveBeenCalled();
        });
    });

});
