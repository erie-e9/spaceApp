import { api } from '@hooks/api';
import { combineReducers } from '@reduxjs/toolkit';
import {
  appPreferences,
  languages,
  modal,
  remoteConfigFeatures,
} from '@slices/shared';

export const reducers = combineReducers({
  appPreferences,
  languages,
  modal,
  remoteConfigFeatures,
  [api.reducerPath]: api.reducer,
});
