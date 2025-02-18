import { createSlice } from '@reduxjs/toolkit';

export interface QueueState {
  queue: any[];
  loading: boolean;
  error: string | null;
}

const initialState: QueueState = {
  queue: [],
  loading: false,
  error: null,
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    // enqueueRequest: (state, action: PayloadAction<FetchArgsWithEnqueueable>) => {
    //     const request = action.payload;
    //     // const timestamp = dayjs(request.timestamp || new Date().toISOString());
    //     const thresholdDays = action?.meta?.threshold || 1;

    //     // Filtrar solicitudes antiguas
    //     state.queue = state.queue.filter((r) => {
    //         const enqueuedDate = dayjs(r.timestamp);
    //         return dayjs().diff(enqueuedDate, 'day') <= thresholdDays;
    //     });

    //     // Agregar la nueva solicitud
    //     state.queue.push(request);
    // },
    enqueueRequest: (state, action) => {
      state.queue.push(action.payload); // Añadir a la cola
    },
    updateQueue: (state, action) => {
      state.queue = action.payload; // Actualizar la cola
    },
  },
});

export const { enqueueRequest, updateQueue } = queueSlice.actions;

export default queueSlice.reducer;
