import { createSlice } from '@reduxjs/toolkit';
import { type AppPreferencesState, type AppPreferencesPayload } from '@slices/types/appPreferences';

const initialState: Partial<AppPreferencesState> = {
  theme: 'default',
  mode: null,
  language: null,
  biometrics: false,
};

const appPreferencesSlice = createSlice({
  name: 'appPreferences',
  initialState,
  reducers: {
    changeTheme: (state, { payload: { theme } }: AppPreferencesPayload) => {
      if (typeof theme !== 'undefined') {
        state.theme = theme;
      }
    },
    changeMode: (state, { payload: { mode } }: AppPreferencesPayload) => {
      state.mode = mode;
    },
    changeLanguage: (state, { payload: { language } }) => {
      state.language = language;
    },
    toggleBiometrics: (state, { payload: { biometrics } }) => {
      state.biometrics = biometrics;
    },
  },
});

export const { changeTheme, changeMode, changeLanguage, toggleBiometrics } =
  appPreferencesSlice.actions;

export default appPreferencesSlice.reducer;
