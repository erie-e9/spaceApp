import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  EndpointBuilder,
} from '@reduxjs/toolkit/query/react';
import RNSslPinning from 'react-native-ssl-pinning';
import { storage } from '@redux/store';
import { Logger } from '@services';
import { useCheckNet } from '@hooks';
import NetInfo from '@react-native-community/netinfo';

interface ApiConfig<
  BaseQuery extends BaseQueryFn = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  ReducerPath extends string = string,
  EntityTypes extends string = string,
> {
  baseUrl: string;
  reducerPath: string;
  tagTypes?: readonly EntityTypes[];
  endpoints: (builder: EndpointBuilder<BaseQuery, EntityTypes, ReducerPath>) => Record<string, any>;
}

// Función para encolar solicitudes en MMKV
const enqueueRequest = (request: FetchArgs) => {
  const queue = JSON.parse(storage.getString('requestQueue') || '[]');
  queue.push(request);
  storage.set('requestQueue', JSON.stringify(queue));
};

const processQueue = async (baseQuerySSL: BaseQueryFn) => {
  const queue = JSON.parse(storage.getString('requestQueue') || '[]');
  for (const request of queue) {
    try {
      // await baseQuerySSL(request);
      await baseQuerySSL(request, {
        dispatch: () => { }, getState: () => { },
        signal: new AbortSignal,
        abort: function (reason?: string): void {
          throw new Error('Function not implemented.');
        },
        extra: undefined,
        endpoint: '',
        type: 'query'
      }, {});


      // await baseQuerySSL(request, { dispatch: () => { }, getState: () => { } }, {});
    } catch (error) {
      Logger.log('[api] - processQueue: Error processing request:', error);
    }
  }
  storage.set('requestQueue', JSON.stringify([])); // Limpia la cola después de procesarla
};

const sslFetch = async (url: string, options: any) => {
  return await RNSslPinning.fetch(url, {
    method: options.method,
    headers: options.headers,
    body: options.body,
    sslPinning: {
      certs: ['your_cert_file'],
    },
  });
};

export const api = ({ baseUrl, reducerPath, tagTypes, endpoints }: ApiConfig) => {
  const { DEBUGGER_MODE } = process.env;
  const token = '';

  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      headers.set('Content-Type', 'application/json');
    },
  });

  const baseQuerySSL: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
  ) => {
    try {
      const { url, method, headers, body } = args as FetchArgs;
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
      Logger.log('Error:', error);
      return { error: { status: 'CUSTOM_ERROR', error: error?.message } };
    }
  };

  const baseQueryWithInterceptor: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    const state = await NetInfo.fetch();
    const isOnline = state.isConnected;
    // const { isOnline } = useCheckNet();

    if (!isOnline) {
      enqueueRequest(args as FetchArgs);
      // return { error: { status: 'OFFLINE', error: 'No internet connection', data:[] }, data: '', meta: {} };
    }

    // Si estamos online, intentar procesar la cola
    await processQueue(baseQuerySSL);

    const result = DEBUGGER_MODE
      ? await baseQuery(args, api, extraOptions)
      : await baseQuerySSL(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      Logger.log('Unauthorized.');
    }
    if (result.error && result.error.status === 'FETCH_ERROR') {
      enqueueRequest(args as FetchArgs);
    }

    return result;
  };

  return createApi({
    baseQuery: baseQueryWithInterceptor,
    reducerPath,
    tagTypes,
    endpoints,
  });
};

export default api;
