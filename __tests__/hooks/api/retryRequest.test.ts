/**
 *
Verifica que se reintenten las solicitudes según lo configurado.
Registra los mensajes esperados en cada intento.
Asegura que después de varios intentos fallidos, se devuelve el estado apropiado.
*/
import retryRequest from './retryRequest'; // Importamos la función
import { Logger } from '@services'; // Para simular logs
import fetchMock from 'jest-fetch-mock'; // Para mockear fetch

fetchMock.enableMocks(); // Activamos fetch mocks

describe('retryRequest', () => {
  const url = 'https://api.example.com/resource';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.resetMocks();
  });

  it('retries the request up to the specified limit when a temporary error occurs', async () => {
    fetchMock
      .mockRejectOnce(new Error('Network Error')) // Primer intento falla
      .mockRejectOnce(new Error('Service Unavailable')) // Segundo intento falla
      .mockResponseOnce(JSON.stringify({ success: true })); // Tercer intento exitoso

    const result = await retryRequest(url, options, 3); // Reintenta hasta 3 veces

    expect(fetchMock).toHaveBeenCalledTimes(3); // Verifica que se intentó 3 veces
    expect(result).toEqual({ success: true }); // Verifica el resultado esperado
  });

  it('stops retrying after the specified limit and throws an error', async () => {
    fetchMock.mockReject(new Error('Network Error')); // Siempre falla

    await expect(retryRequest(url, options, 3)).rejects.toThrow('Network Error'); // Espera un error
    expect(fetchMock).toHaveBeenCalledTimes(3); // Solo se intenta 3 veces
  });

  it('returns the response immediately if the request succeeds on the first attempt', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true })); // Respuesta inmediata

    const result = await retryRequest(url, options, 3);

    expect(fetchMock).toHaveBeenCalledTimes(1); // Solo se llama una vez
    expect(result).toEqual({ success: true }); // Respuesta esperada
  });

  it('logs errors on each failed attempt', async () => {
    jest.spyOn(Logger, 'error'); // Espiamos los logs
    fetchMock.mockReject(new Error('Network Error')); // Siempre falla

    await expect(retryRequest(url, options, 2)).rejects.toThrow('Network Error');

    expect(Logger.error).toHaveBeenCalledTimes(2); // Logs en cada intento fallido
    expect(Logger.error).toHaveBeenCalledWith(
      '[retryRequest] Request failed. Retrying...',
      expect.any(Object),
    );
  });

  it('handles custom headers and request body correctly', async () => {
    const customOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer token123',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: 'value' }),
    };

    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    const result = await retryRequest(url, customOptions, 3);

    expect(fetchMock).toHaveBeenCalledWith(url, customOptions); // Verifica que las opciones personalizadas se usaron
    expect(result).toEqual({ success: true });
  });

  it('throws a custom error when the response is not ok after retries', async () => {
    fetchMock.mockResponses(
      [null, { status: 500 }],
      [null, { status: 503 }],
      [null, { status: 503 }],
    );

    await expect(retryRequest(url, options, 3)).rejects.toThrow(
      'Failed to fetch resource after 3 retries.',
    );

    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
