import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  Storage,
} from 'redux-persist';
import { MMKV, Mode } from 'react-native-mmkv';
import { apiTasks } from '@hooks/api/rest';
import { reducers } from '@store/reducers';

const { APP_NAME, APP_ENCRYPTION_KEY } = process.env;

export const storage = new MMKV({
  id: `user-${APP_NAME}-storage`,
  encryptionKey: `${APP_NAME}-${APP_ENCRYPTION_KEY}-encryption-key`,
  mode: Mode.MULTI_PROCESS,
});

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['appPreferences', 'auth', 'languages', 'remoteConfigFeatures', 'token', 'user', 'tasks'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }).concat(apiTasks.middleware);
    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      middlewares.push();
    }

    return middlewares;
  },
  devTools: process.env.NODE_ENV !== 'production'
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export { store, persistor };
