import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type ResponseHandlerState } from '@slices/types/responseHandler';

const initialState: Partial<ResponseHandlerState> = {
  loading: false,
  error: '',
};

const responseHandlerSlice = createSlice({
  name: 'responseHandler',
  initialState,
  reducers: {
    setLoadingState: (state, { payload }: PayloadAction<boolean>) => {
      return { ...state, loading: payload };
    },
    setErrorState: (state, { payload }: PayloadAction<string>) => {
      return { ...state, error: payload };
    },
  },
});

export const { setLoadingState, setErrorState } = responseHandlerSlice.actions;

export { responseHandlerSlice };

export default responseHandlerSlice.reducer;
