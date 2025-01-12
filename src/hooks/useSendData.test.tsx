import { renderHook, act } from '@testing-library/react';
import useSendData from './useSendData';

// Mock fetch globally
global.fetch = jest.fn();

describe('useSendData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should handle successful data submission', async () => {
        const mockResponse = { success: true };
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            })
        );

        const { result } = renderHook(() => useSendData());

        expect(result.current.isLoading).toBe(false);
        expect(result.current.success).toBe(false);

        const testData = { name: 'Test User', email: 'test@example.com' };

        await act(async () => {
            await result.current.sendDataRequest(testData);
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.success).toBe(true);
        expect(global.fetch).toHaveBeenCalledWith(
            'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testData),
            }
        );
    });

    it('should handle API errors', async () => {
        const errorMessage = 'API Error';
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ errorMessage }),
            })
        );

        const { result } = renderHook(() => useSendData());
        const testData = { name: 'Test User', email: 'test@example.com' };

        await act(async () => {
            try {
                await result.current.sendDataRequest(testData);
            } catch (error: any) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(error.message).toBe(errorMessage);
            }
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.success).toBe(false);
    });

});
