import { Middleware } from '@reduxjs/toolkit';
import { dayjs } from '@utils/formatters';
import { enqueueRequest } from '@slices/private'; // Acción que agrega elementos a la cola
import { storage } from '@redux/store';
import { Logger } from '@services';

export const queueCleanupMiddleware: Middleware = (store) => (next) => (action) => {
  if (enqueueRequest.match(action)) {
    Logger.log('Middleware interceptó enqueueRequest', { action });

    const state = store.getState();
    const thresholdDays = action.meta?.threshold || 3; // Umbral de tiempo en días
    const queue = state.queue.queue; // Asume que `queue` está en el slice de Redux

    const filteredQueue = queue.filter((item: any) => {
      const enqueuedDate = dayjs(item.timestamp);
      return dayjs().diff(enqueuedDate, 'day') <= thresholdDays;
    });

    // Actualizar la cola en MMKV
    storage.set('requestQueue', JSON.stringify(filteredQueue));

    // Actualizar el estado de Redux con la cola filtrada
    store.dispatch({
      type: 'queue/updateQueue', // Acción para actualizar el estado del slice
      payload: filteredQueue,
    });
  }

  return next(action); // Continuar con la ejecución normal
};
