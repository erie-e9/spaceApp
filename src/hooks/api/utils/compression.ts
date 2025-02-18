/**
 * Reducción del consumo de datos. Los usuarios consumen menos datos móviles, lo que puede ser crucial en regiones donde la conectividad es costosa o limitada.
 * Mejora la experiencia del usuario al reducir los tiempos de espera, especialmente para usuarios en redes móviles 3G o 4G.
 * Esto reduce el uso del hardware de red, ayudando a conservar la batería del dispositivo
 *  reduce la carga en la CPU durante el envío y recepción de solicitudes.
 *
 * Backend
 * Los sistemas pueden escalar mejor y soportar una mayor cantidad de usuarios sin necesidad de infraestructuras costosas.
 * Disminuye el uso del ancho de banda del servidor, reduciendo costos y mejorando el rendimiento en sistemas con alta concurrencia.
 * Mejora el tiempo de respuesta, lo que aumenta la satisfacción del usuario final.
 * Las empresas pueden ahorrar en costos operativos de red y servidor.
 * Manejo eficiente de big data: Mejora la capacidad del backend para manejar flujos de datos intensivos.
 *
 * Ambos
 * Seguridad: Aunque no es un sustituto de la encriptación, la compresión añade una ligera capa de "ofuscación".
 * Implementar compresión mantiene la solución alineada con las mejores prácticas y estándares de la industria.
 * Los usuarios experimentan tiempos de respuesta más rápidos y consistentes en diferentes condiciones de red.
 *
 * Consideraciones importantes
 * La compresión y descompresión consume recursos del procesador, lo que podría impactar dispositivos de gama baja o servidores con alta carga.
 * Es esencial asegurarse de que tanto el cliente como el servidor manejen la compresión de manera compatible y sin errores.
 * Para cargas muy pequeñas (por ejemplo, menos de 1 KB), la compresión puede ser innecesaria y generar sobrecarga adicional.
 * Datos ya comprimidos (por ejemplo, imágenes o videos) no deben ser comprimidos nuevamente, ya que esto puede aumentar el tamaño de los datos.
 */

import { Logger } from '@services';
import { gzipSync, compress } from 'fflate';

/**
 * Compresses the given JSON object using gzip.
 * @param data The data to compress.
 * @returns The compressed data as a Uint8Array.
 */

export const compressBody = (body: string) => {
  try {
    Logger.log('[Compression] Original body size:', body.length, 'bytes');
    const compressed = gzipSync(new TextEncoder().encode(body));
    Logger.log('[Compression] Compressed body size:', compressed.length, 'bytes');
    return compressed;
  } catch (error) {
    Logger.error('[Compression] Error compressing request body:', error);
    throw new Error('Failed to compress request body');
  }
};

export const compressPayload = (body: object): Uint8Array => {
  const jsonString = JSON.stringify(body);
  return gzipSync(new TextEncoder().encode(jsonString));
};

export const compressRequestBody = async (
  body: any,
): Promise<{ compressed: Uint8Array; originalSize: number; compressedSize: number }> => {
  return new Promise((resolve, reject) => {
    try {
      const jsonBody = JSON.stringify(body);
      const originalSize = new TextEncoder().encode(jsonBody).length;

      compress(new TextEncoder().encode(jsonBody), (err, compressed) => {
        if (err) {
          reject(err);
        }

        const compressedSize = compressed.length;
        resolve({ compressed, originalSize, compressedSize });
      });
    } catch (error) {
      reject(error);
    }
  });
};
