import { useState } from 'react';

const endpoint = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';

export interface FormData {
    name: string;
    email: string;
}

const sendData = async (data: FormData) => {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.errorMessage || 'Failed to send data');
    }

    return responseData;
}

const useSendData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [sendDataError, setSendDataError] = useState("");

    const sendDataRequest = async (data: FormData) => {
        setIsLoading(true);
        setSendDataError("");

        try {
            const response = await sendData(data);
            setSuccess(true);
            return response;
        } catch (error: any) {
            setSendDataError(error.message);
            return error.message;
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, success, sendDataError, sendDataRequest, setSuccess };
};

export default useSendData;
