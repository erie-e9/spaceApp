import { api } from '@hooks/api';
import { combineReducers } from '@reduxjs/toolkit';
import { appPreferences } from '@slices/shared';
import { languages } from '@slices/shared';

export const reducers = combineReducers({
  appPreferences,
  languages,
  [api.reducerPath]: api.reducer,
});
