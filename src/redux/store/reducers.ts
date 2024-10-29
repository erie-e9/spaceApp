import { api } from '@hooks/api';
import { combineReducers } from '@reduxjs/toolkit';
import {
  appPreferences,
  languages,
  modal,
  remoteConfigFeatures,
  responseHandler,
} from '@slices/shared';

export const reducers = combineReducers({
  appPreferences,
  languages,
  modal,
  remoteConfigFeatures,
  responseHandler,
  [api.reducerPath]: api.reducer,
});
