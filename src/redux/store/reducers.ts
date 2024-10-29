import { api } from '@hooks/api';
import { combineReducers } from '@reduxjs/toolkit';
import {
  appPreferences,
  languages,
  modal,
  remoteConfigFeatures,
  responseHandler,
} from '@slices/shared';
import { token, user } from '@slices/auth';

export const reducers = combineReducers({
  appPreferences,
  languages,
  modal,
  remoteConfigFeatures,
  responseHandler,
  token,
  user,
  [api.reducerPath]: api.reducer,
});
