import { api } from '@services/api';
import { combineReducers } from '@reduxjs/toolkit';
import { appPreferences } from '@slices/shared';

export const reducers = combineReducers({
  appPreferences,
  [api.reducerPath]: api.reducer,
});
