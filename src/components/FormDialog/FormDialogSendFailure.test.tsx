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

const errorMessage = 'Bad Request: Email is already in use';
jest.mock('../../hooks/useSendData', () => ({
    __esModule: true,
    default: () => ({
        isLoading: false,
        success: false,
        sendDataRequest: jest.fn().mockRejectedValue(new Error(errorMessage))
    })
}));

describe('FormDialog with sendData failures', () => {
    const defaultProps = {
        open: true,
        onClose: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('displays error message when submission fails', async () => {

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
