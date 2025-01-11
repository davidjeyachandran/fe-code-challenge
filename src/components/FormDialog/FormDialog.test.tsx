import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FormDialog from './FormDialog';

// Mock the custom hooks
const mockValidateForm = jest.fn();
const mockSendDataRequest = jest.fn();

jest.mock('../../hooks/useFormValidation', () => ({
    useFormValidation: () => ({
        errors: {
            fullname: 'Full name is required',
            email: 'Email is invalid',
            emailConfirm: 'Emails do not match'
        },
        validateForm: mockValidateForm
    })
}));

jest.mock('../../hooks/useSendData', () => ({
    __esModule: true,
    default: () => ({
        isLoading: false,
        success: false,
        sendDataRequest: mockSendDataRequest,
        setSuccess: jest.fn()
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

    it('renders all form fields', () => {
        render(<FormDialog {...defaultProps} />);

        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getAllByLabelText(/email/i)).toHaveLength(2);
        expect(screen.getByLabelText(/confirm email/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    });

    it('renders validation errors', async () => {
        mockValidateForm.mockReturnValue(false);
        render(<FormDialog {...defaultProps} />);

        userEvent.type(screen.getByLabelText(/full name/i), '');
        userEvent.type(screen.getAllByLabelText(/email/i)[0], 'invalid-email');
        userEvent.type(screen.getByLabelText(/confirm email/i), 'different-email@example.com');

        userEvent.click(screen.getByRole('button', { name: /send/i }));

        expect(screen.getByText('Full name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is invalid')).toBeInTheDocument();
        expect(screen.getByText('Emails do not match')).toBeInTheDocument();
    });
});

describe('FormDialog submission', () => {
    const defaultProps = {
        open: true,
        onClose: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('handles form submission with valid data', async () => {
        mockValidateForm.mockReturnValue(true);
        mockSendDataRequest.mockResolvedValueOnce('Registered');

        render(<FormDialog {...defaultProps} />);

        userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
        userEvent.type(screen.getAllByLabelText(/email/i)[0], 'john@example.com');
        userEvent.type(screen.getByLabelText(/confirm email/i), 'john@example.com');

        userEvent.click(screen.getByRole('button', { name: /send/i }));

        await waitFor(() => {
            expect(defaultProps.onClose).toHaveBeenCalled();
        });
    });

    it('handles form submission with an error response', async () => {
        mockValidateForm.mockReturnValue(true);
        const errorMessage = 'Bad Request: Email is already in use';
        mockSendDataRequest.mockRejectedValueOnce(new Error(errorMessage));

        render(<FormDialog {...defaultProps} />);

        userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
        userEvent.type(screen.getAllByLabelText(/email/i)[0], 'john@example.com');
        userEvent.type(screen.getByLabelText(/confirm email/i), 'john@example.com');

        userEvent.click(screen.getByRole('button', { name: /send/i }));

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
});
