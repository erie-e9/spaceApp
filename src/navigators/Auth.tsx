import React, { memo } from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { type ApplicationStackParamList } from '@types';
import { Authentication, SignUp, OnBoarding } from '@components/screens/Auth';

export type signUpMethod = 'form' | 'socialMedia';

export type AuthenticationParamsList = {
  Authentication: undefined;
  OnBoarding: undefined;
  SignUp: undefined;
};

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

export const AuthenticationNavigator = () => {
  return (
    <Navigator
      initialRouteName="Authentication"
      screenOptions={{
        gestureEnabled: true,
        animationEnabled: true,
        freezeOnBlur: true,
        headerShown: false,
        headerMode: 'screen',
        headerBackTitleVisible: true,
        headerTransparent: true,
        ...TransitionPresets.ScaleFromCenterAndroid,
      }}
    >
      <Screen key="Authentication" name="Authentication" component={Authentication} />
      <Screen key="SignUp" name="SignUp" component={SignUp} />
      <Screen key="OnBoarding" name="OnBoarding" component={OnBoarding} />
    </Navigator>
  );
};

export default memo(AuthenticationNavigator);
