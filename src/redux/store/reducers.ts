import { apiTasks } from '@hooks/api/rest';
import { combineReducers } from '@reduxjs/toolkit';
import {
  appPreferences,
  languages,
  modal,
  remoteConfigFeatures,
  responseHandler,
} from '@slices/shared';
import { tasks } from '@slices/private';
import { token, user } from '@slices/auth';

export const reducers = combineReducers({
  // shared
  appPreferences,
  languages,
  modal,
  remoteConfigFeatures,
  responseHandler,
  token,
  user,
  // private
  tasks,
  [apiTasks.reducerPath]: apiTasks.reducer,
});
