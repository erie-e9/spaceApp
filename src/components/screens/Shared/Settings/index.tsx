import React, { memo } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { type ApplicationStackParamList } from '@types';
import { HelpCenterNavigator, HelpCenterParamsList } from '@components/screens/Shared';
import { CustomFallback, Menu, SettingsMenu } from '@components/screens/Shared';

export type MenuParamsList = {
  CustomFallback: {
    error: Error;
    resetError: () => void;
  };
  Menu: undefined;
  HelpCenter: undefined;
  SettingsMenu: undefined;
  Warning: undefined;
} & HelpCenterParamsList;

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

export const MenuNavigator = (): React.JSX.Element => {
  return (
    <Navigator
      initialRouteName="Menu"
      screenOptions={{
        gestureEnabled: true,
        animationEnabled: true,
        freezeOnBlur: true,
        headerShown: false,
        headerMode: 'screen',
        headerBackTitleVisible: true,
        headerTransparent: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Screen key="CustomFallback" name="CustomFallback" component={CustomFallback as any} />
      <Screen key="Menu" name="Menu" component={Menu} />
      <Screen key="SettingsMenu" name="SettingsMenu" component={SettingsMenu} />
      <Screen key="HelpCenter" name="HelpCenter" component={HelpCenterNavigator} />
    </Navigator>
  );
};

export default memo(MenuNavigator);
