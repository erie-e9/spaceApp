/** This hook allows these awesome features:
 *? ✅ Retry requests logic with delay.
 *? ✅ Request Queue Management: Handles optional queuing requests when offline or when specific error scenarios occur, ensuring reliable delivery when connectivity is restored.
  *? Unique queue store, Unify/merge body for several UPDATE and PATCH request for same item.
  *? DELETE priority (block new queue request if item has DELETE request stored).
 *? ✅ Custom SSL Implementation: Integrates SSL pinning for enhanced security in network requests using react-native-ssl-pinning.
 *? ✅ Network Connectivity Handling: Detects network status using @react-native-community/netinfo and dynamically enqueues or processes requests based on connectivity.
 *? ✅ Request Interception: Intercepts requests to handle scenarios like token expiration, offline mode, and fetch errors.
 *? ✅ Dynamic API Creation: Provides a reusable and flexible API generator with customizable endpoints, base URLs, and reducers.
 *? ✅ Debug Mode Compatibility: Differentiates between standard and debug modes for request handling, enabling a tailored development experience.
 *? ✅ Error Logging: Implements comprehensive logging using a Logger service to aid debugging and provide clarity on request failures. 
 * **/

import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  EndpointBuilder,
} from '@reduxjs/toolkit/query/react';
import RNSSLPinning from 'react-native-ssl-pinning';
import NetInfo from '@react-native-community/netinfo';
import { Logger } from '@services';
import { retry, enqueue, processQueue } from './utils';

export interface FetchArgsWithEnqueueable extends FetchArgs {
  idRequest?: number;
  timestamp?: string;
  enqueueable?: boolean;
  retries?: number;
  retryDelay?: number; // miliseconds
}

// Defines the API configuration structure, allowing flexible customization of endpoints, reducers, and tags.
interface ApiConfig<
  BaseQuery extends BaseQueryFn = BaseQueryFn<string | FetchArgsWithEnqueueable, unknown, FetchBaseQueryError>,
  ReducerPath extends string = string,
  EntityTypes extends string = string,
> {
  baseUrl: string; // Base URL for API requests.
  reducerPath: string; // Reducer path for API integration in Redux.
  tagTypes?: readonly EntityTypes[]; // Optional tags for cache management.
  endpoints: (builder: EndpointBuilder<BaseQuery, EntityTypes, ReducerPath>) => Record<string, any>; // Endpoint definitions.
}

// Sends a request using SSL pinning.
const sslFetch = async (url: string, options: any) => {
  return await RNSSLPinning.fetch(url, {
    method: options.method,
    headers: options.headers,
    body: options.body,
    sslPinning: {
      certs: ['your_cert_file'],
    },
  });
};

// Creates the API with an optional SSL-enabled query layer.
export const api = ({ baseUrl, reducerPath, tagTypes, endpoints }: ApiConfig) => {

  // Default query setup using fetchBaseQuery.
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  });

  // Query setup with SSL pinning.
  const baseQuerySSL: BaseQueryFn<string | FetchArgsWithEnqueueable, unknown, FetchBaseQueryError> = async (
    args,
  ) => {
    try {
      const { url, method, headers, body } = args as FetchArgsWithEnqueueable;
      const { data, status, json } = await sslFetch(`${baseUrl}${url}`, {
        method,
        headers,
        body,
      });

      if (!data) {
        throw new Error(`Network response was not ok: ${status}`);
      }
      return { data: await json() };
    } catch (error: any) {
      Logger.error('[baseQuerySSL] Error:', error);
      return { error: { status: 'CUSTOM_ERROR', error: error.message } };
    }
  };

  const baseQueryWithInterceptor: BaseQueryFn<FetchArgsWithEnqueueable, unknown, unknown> =
    async (args, api, extraOptions) => {
      const { retries = 1, retryDelay = 1000 } = args

      const { isConnected } = await NetInfo.fetch(); // Connection handler
      const { DEBUGGER_MODE } = process.env;
      const useSSL = !DEBUGGER_MODE;

      if (!isConnected) {
        Logger.log('[Interceptor] Device is offline. Enqueuing request.');
        enqueue(args as FetchArgsWithEnqueueable);
        return { error: { status: 'OFFLINE', error: 'No internet connection' } };
      } else {

        // Trigger queue requests when connection's back
        await processQueue(useSSL ? baseQuerySSL : baseQuery);

        let result = useSSL
          ? await baseQuerySSL(args, api, extraOptions)
          : await baseQuery(args, api, extraOptions);

        if (result.error) {
          const { status } = result.error;
          if (status === 401) {
            Logger.log('[Interceptor] Unauthorized. Handling token refresh...');
            // Token refresh logic here.
          } else if (status === 'FETCH_ERROR' || status === 'PARSING_ERROR') {
            Logger.log('[Interceptor] Fetch error. Retrying request.');
            result = await retry(args, useSSL ? baseQuerySSL : baseQuery, { retries: retries, delay: retryDelay });

            if (result.error) {
              Logger.log(`[Interceptor] Fetch error after ${retries} times every ${retryDelay}mm.`);
              enqueue(args as FetchArgsWithEnqueueable);
            }
          }
        }

        return result;
      }
    };

  return createApi({
    baseQuery: baseQueryWithInterceptor,
    reducerPath,
    tagTypes,
    endpoints,
  });
};

export default api;
