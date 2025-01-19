import { createSlice } from '@reduxjs/toolkit';
import type { TokenState, TokenPayload } from '@slices/types';

const initialState: Partial<TokenState> = {
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
      state.content = '';
    },
  },
});

export const { storeToken, removeToken } = slice.actions;

export default slice.reducer;
