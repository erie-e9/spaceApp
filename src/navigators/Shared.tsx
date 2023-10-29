import React, { memo } from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  CustomFallback,
  Home,
  Startup,
  Settings,
  Warning,
} from '@components/screens/Shared';

export type SharedParamsList = {
  CustomFallback: {
    error: Error;
    resetError: () => void;
  };
  Home: undefined;
  Startup: undefined;
  WebViewer: {
    url: string;
  };
  Settings: undefined;
  Warning: undefined;
};

const { Navigator, Screen } = createStackNavigator<SharedParamsList>();

export const SharedNavigator = () => {
  return (
    <Navigator
      initialRouteName="Startup"
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true,
        headerMode: 'screen',
        ...TransitionPresets.ScaleFromCenterAndroid,
        // {/* <Screen name="Startup" component={Startup} /> */}z
      }}
    >
      <Screen name="CustomFallback" component={CustomFallback as any} />
      <Screen name="Home" component={Home} />
      <Screen name="Startup" component={Startup} />
      <Screen name="Settings" component={Settings} />
      <Screen name="Warning" component={Warning} />
    </Navigator>
  );
};

export default memo(SharedNavigator);
