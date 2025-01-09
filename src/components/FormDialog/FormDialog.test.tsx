import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FormDialog from './FormDialog';

// Mock the custom hooks
jest.mock('../../hooks/useFormValidation', () => ({
    useFormValidation: () => ({
        errors: {},
        validateForm: jest.fn().mockReturnValue(true)
    })
}));

jest.mock('../../hooks/useSendData', () => ({
    __esModule: true,
    default: () => ({
        isLoading: false,
        success: false,
        sendDataRequest: jest.fn()
            .mockResolvedValue('Registered'),
        setSuccess: jest.fn()
    })
}));

describe('FormDialog with valid data', () => {
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

    it('handles form submission with valid data', async () => {
        render(<FormDialog {...defaultProps} />);

        userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
        userEvent.type(screen.getAllByLabelText(/email/i)[0], 'john@example.com');
        userEvent.type(screen.getByLabelText(/confirm email/i), 'john@example.com');

        userEvent.click(screen.getByRole('button', { name: /send/i }));

        await waitFor(() => {
            expect(defaultProps.onClose).toHaveBeenCalled();
        });
    });

});
