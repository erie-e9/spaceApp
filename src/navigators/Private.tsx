import React, { memo } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { type ApplicationStackParamList, type Task as TypeTask } from '@types';
import { Profile, Notifications, Tasks, Task } from '@components/screens/Private';

export type PrivateParamsList = {
  Profile: undefined;
  Notifications: undefined;
  Tasks: undefined;
  Task: {
    task: TypeTask;
  };
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
      <Screen
        key="Tasks"
        name="Tasks"
        component={Tasks}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Screen
        key="Task"
        name="Task"
        component={Task}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Navigator>
  );
};

export default memo(PrivateNavigator);
