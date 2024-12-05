import { Logger } from '@services';
import { FetchArgsWithEnqueueable } from '..';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface RetryOptions {
    retries: number;
    delay?: number;
}

export const retry = async (
    args: FetchArgsWithEnqueueable,
    fetchFunction: (url: string, options: any) => Promise<any>,
    options: RetryOptions
): Promise<any> => {
    const { retries, delay = 1000 } = options;
    const { url, method, headers, body } = args;

    let attempt = 0;
    let lastError: FetchBaseQueryError | null = null;

    while (attempt < retries) {
        try {
            Logger.log(`[retry] Attempt ${attempt + 1} for ${method}/${url}`);
            const response = await fetchFunction(url, { method, headers, body });
            // Check if the fetch function returns Redux Toolkit BaseQuery-like responses
            if (response?.data) {
                return { data: response.data };
            }

            // Handle response as an HTTP Response object
            if (response?.json) {
                return { data: await response.json() };
            }

            // Unknown response structure
            throw new Error('[retry] Unrecognized response structure');
        } catch (err: any) {
            lastError = err;
            Logger.error(`[retry] Attempt ${attempt + 1} failed:`, { error: err });

            attempt++;
            if (attempt < retries) {
                Logger.log(`[retry] Retrying in ${delay}ms...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }

    // After exhausting retries
    return {
        error: {
            status: 'RETRY_FAILED',
            error: lastError?.message || `Request failed after ${retries} retries`,
        },
    };
};

export default retry;
