import React, { memo } from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { ApplicationStackParamList } from '@utils/@types/navigation';
import {
  CustomFallback,
  Home,
  SettingsNavigator,
  Warning,
  WebViewer,
} from '@components/screens/Shared';
import { SettingsParamsList } from '@components/screens/Shared/Settings';

export type SharedParamsList = {
  CustomFallback: {
    error: Error;
    resetError: () => void;
  };
  Home: undefined;
  Settings: undefined;
  InfoAndSupportMenu: undefined;
  Startup: undefined;
  Warning: undefined;
  WebViewer: {
    url: string;
    onReload?: () => void;
    onClose?: () => void;
  };
} & SettingsParamsList;

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

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
      <Screen
        key="CustomFallback"
        name="CustomFallback"
        component={CustomFallback as any}
      />
      <Screen key="Home" name="Home" component={Home} />
      <Screen key="Settings" name="Settings" component={SettingsNavigator} />
      <Screen key="Warning" name="Warning" component={Warning} />
      <Screen key="WebViewer" name="WebViewer" component={WebViewer} />
    </Navigator>
  );
};

export default memo(SharedNavigator);
