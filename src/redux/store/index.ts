import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Storage,
} from 'redux-persist';
import { MMKV, Mode } from 'react-native-mmkv';
import { api } from '@hooks/api';
import { reducers } from '@store/reducers';

const { APP_NAME, APP_ENCRYPTION_KEY } = process.env;

// Use a secure method to store and retrieve your encryption key
const encryptionKey = `${APP_NAME}-${APP_ENCRYPTION_KEY}-encryption-key`;

export const storage = new MMKV({
  id: `user-${APP_NAME}-storage`,
  encryptionKey,
  mode: 'MULTI_PROCESS',
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
  whitelist: ['appPreferences', 'auth', 'languages', 'remoteConfigFeatures', 'token', 'user'],
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
    }).concat(api.middleware);

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      middlewares.push();
    }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export { store, persistor };
