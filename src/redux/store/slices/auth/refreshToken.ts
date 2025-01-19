import { createSlice } from '@reduxjs/toolkit';
import type { RefreshTokenState, RefreshTokenPayload } from '@slices/types';

const initialState: RefreshTokenState = {
  content: {},
};

const slice = createSlice({
  name: 'refreshToken',
  initialState,
  reducers: {
    storeRefreshToken: (state, { payload: { content } }: RefreshTokenPayload) => {
      state.content = content;
    },
    removeRefreshToken: (state) => {
      state.content = {};
    },
  },
});

export const { storeRefreshToken, removeRefreshToken } = slice.actions;

export default slice.reducer;
