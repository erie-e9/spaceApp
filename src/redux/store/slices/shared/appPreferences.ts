import { createSlice } from '@reduxjs/toolkit';
import {
  AppPreferencesState,
  AppPreferencesPayload,
} from '@slices/types/appPreferences';

const initialState: Partial<AppPreferencesState> = {
  theme: 'default',
  darkMode: null,
  language: 'en',
};

const slice = createSlice({
  name: 'appPreferences',
  initialState,
  reducers: {
    changeTheme: (
      state,
      { payload: { theme, darkMode } }: AppPreferencesPayload,
    ) => {
      if (typeof theme !== 'undefined') {
        state.theme = theme;
      }
      if (typeof darkMode !== 'undefined') {
        state.darkMode = darkMode;
      }
    },
    setDefaultTheme: (
      state,
      { payload: { theme, darkMode } }: AppPreferencesPayload,
    ) => {
      if (state.theme) {
        if (typeof theme !== 'undefined') {
          state.theme = theme;
        }
        if (typeof darkMode !== 'undefined') {
          state.darkMode = darkMode;
        }
      }
    },
    changeLanguage: (state, { payload: { language } }) => {
      state.language = language;
    },
  },
});

export const { changeTheme, setDefaultTheme, changeLanguage } = slice.actions;

export default slice.reducer;
