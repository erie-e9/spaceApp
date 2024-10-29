import { createSlice } from '@reduxjs/toolkit';
import { type TokenState, type TokenPayload } from '@slices/types/token';

const initialState: TokenState = {
  content: '',
};

const slice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    storeToken: (state, { payload: { content } }: TokenPayload) => {
      state.content = content;
    },
    removeToken: (state) => {
      state.content = {};
    },
  },
});

export const { storeToken, removeToken } = slice.actions;

export default slice.reducer;
