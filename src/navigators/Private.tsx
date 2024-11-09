import React, { memo } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { type ApplicationStackParamList } from '@types';
import { Profile, Notifications } from '@components/screens/Private';

export type PrivateParamsList = {
  Profile: undefined;
  Notifications: undefined;
};

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

export const PrivateNavigator = () => {
  return (
    <Navigator
      initialRouteName="Profile"
      screenOptions={{
        gestureEnabled: true,
        freezeOnBlur: true,
        headerShown: false,
        headerMode: 'screen',
        headerTransparent: true,
      }}
    >
      <Screen
        key="Profile"
        name="Profile"
        component={Profile}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
        }}
      />
      <Screen
        key="Notifications"
        name="Notifications"
        component={Notifications}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Navigator>
  );
};

export default memo(PrivateNavigator);
