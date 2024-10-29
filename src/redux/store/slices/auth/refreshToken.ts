import { createSlice } from '@reduxjs/toolkit';
import { type RefreshTokenState, type RefreshTokenPayload } from '@slices/types/refreshToken';

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
