/**
 Comprueba que las solicitudes fallidas se reintenten.
 Verifica que después de alcanzar el límite de reintentos, las solicitudes se encolen.
 Maneja errores inesperados sin romper el flujo.
*/

import { sslFetch } from '@hooks/api';
import { retryRequest } from '@hooks/api/utils';
import { Logger } from '@services';

jest.mock('@services', () => ({
  Logger: {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../path-to-your-function', () => ({
  retryRequest: jest.fn(),
}));

describe('sslFetch', () => {
  const mockBaseQuery = jest.fn();
  const mockEnqueueRequest = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retry and succeed within the retry limit', async () => {
    (retryRequest as jest.Mock).mockResolvedValueOnce({
      success: true,
      result: { data: { success: true } },
    });

    await sslFetch('/test', {}, mockBaseQuery, mockEnqueueRequest, 3);

    expect(retryRequest).toHaveBeenCalledWith(
      { url: '/test', method: undefined, headers: undefined, body: undefined },
      mockBaseQuery,
      3,
    );
    expect(Logger.log).toHaveBeenCalledWith('[sslFetch] Request succeeded after retries.');
  });

  it('should enqueue request after retry limit is reached', async () => {
    (retryRequest as jest.Mock).mockResolvedValueOnce({ success: false });

    await sslFetch('/test', {}, mockBaseQuery, mockEnqueueRequest, 3);

    expect(retryRequest).toHaveBeenCalledWith(
      { url: '/test', method: undefined, headers: undefined, body: undefined },
      mockBaseQuery,
      3,
    );
    expect(mockEnqueueRequest).toHaveBeenCalledWith({
      url: '/test',
      method: undefined,
      headers: undefined,
      body: undefined,
    });
    expect(Logger.log).toHaveBeenCalledWith('[sslFetch] Adding request to queue after retries.');
  });

  it('should handle unexpected errors gracefully', async () => {
    mockBaseQuery.mockImplementationOnce(() => {
      throw new Error('Unexpected Error');
    });

    await sslFetch('/test', {}, mockBaseQuery, mockEnqueueRequest, 3);

    expect(mockEnqueueRequest).toHaveBeenCalledWith({
      url: '/test',
      method: undefined,
      headers: undefined,
      body: undefined,
    });
    expect(Logger.error).toHaveBeenCalledWith('[sslFetch] Unexpected error:', expect.any(Error));
  });
});
