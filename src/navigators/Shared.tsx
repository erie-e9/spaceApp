import React, { memo } from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  CustomFallback,
  Home,
  Warning,
  WebViewer,
} from '@components/screens/Shared';

export type SharedParamsList = {
  CustomFallback: {
    error: Error;
    resetError: () => void;
  };
  Home: undefined;
  Startup: undefined;
  Warning: undefined;
  WebViewer: {
    url: string;
    onReload?: () => void;
    onClose?: () => void;
  };
};

const { Navigator, Screen } = createStackNavigator<SharedParamsList>();

export const SharedNavigator = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true,
        headerMode: 'screen',
        ...TransitionPresets.ScaleFromCenterAndroid,
      }}
    >
      <Screen name="CustomFallback" component={CustomFallback as any} />
      <Screen name="Home" component={Home} />
      <Screen name="Warning" component={Warning} />
      <Screen name="WebViewer" component={WebViewer} />
    </Navigator>
  );
};

export default memo(SharedNavigator);
