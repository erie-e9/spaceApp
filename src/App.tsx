import 'react-native-gesture-handler';
import '@services/translations';
import React, { useLayoutEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from '@store';
import ApplicationNavigator from './navigators/Application';
import { useRemoteConfig } from '@hooks';

const App = () => {
  const { getRemoteFeatures } = useRemoteConfig(store.dispatch);

  useLayoutEffect(() => {
    getRemoteFeatures();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
