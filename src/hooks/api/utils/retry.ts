import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Logger } from '@services';
import { FetchArgsWithEnqueueable } from '..';

interface RetryOptions {
  retries: number;
  delay?: number;
}

export const retry = async (
  args: FetchArgsWithEnqueueable,
  fetchFunction: (url: string, options: any) => Promise<any>,
  options: RetryOptions,
): Promise<any> => {
  const { retries, delay = 1000 } = options;
  const { url, method, headers, body } = args;

  let attempt = 0;
  let lastError: FetchBaseQueryError | null = null;

  while (attempt < retries) {
    try {
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
    } catch (error: any) {
      lastError = error;
      Logger.warn(`[retry] Attempt ${attempt + 1} for ${method}/${url} method, failed:`, { error });

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
