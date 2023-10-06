import { api } from '@hooks/api';
import { combineReducers } from '@reduxjs/toolkit';
import { appPreferences, languages, modal } from '@slices/shared';

export const reducers = combineReducers({
  appPreferences,
  languages,
  modal,
  [api.reducerPath]: api.reducer,
});
