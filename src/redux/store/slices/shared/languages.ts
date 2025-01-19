import { createSlice } from '@reduxjs/toolkit';
import type { LanguagesState, LanguagesPayload } from '@slices/types';

const initialState: LanguagesState = {
  content: {},
};

const slice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    storeLanguages: (state, { payload: { content } }: LanguagesPayload) => {
      state.content = content;
    },
  },
});

export const { storeLanguages } = slice.actions;

export default slice.reducer;
