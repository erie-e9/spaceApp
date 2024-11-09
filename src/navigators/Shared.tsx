import React, { memo } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { type UserState } from '@redux/store/slices/types';
import { type ApplicationStackParamList, type InfoType } from '@types';
import { Home, MenuNavigator, WebViewer, type MenuParamsList } from '@components/screens/Shared';

export type SharedParamsList = {
  Home: undefined;
  Settings: undefined;
  InfoAndSupportMenu: undefined;
  Startup: undefined;
  WebViewer: {
    url: string;
    onReload?: () => void;
    onClose?: () => void;
  };
  FieldEditor: {
    fieldId: Partial<UserState>;
    fieldName: string;
  };
  Info: {
    type: InfoType;
  } & MenuParamsList;
};

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

export const SharedNavigator = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: true,
        freezeOnBlur: true,
        headerShown: false,
        headerMode: 'screen',
        headerTransparent: true,
      }}
    >
      <Screen key="Home" name="Home" component={Home} />
      <Screen
        key="MenuNavigator"
        name="MenuNavigator"
        component={MenuNavigator}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
        }}
      />
      <Screen key="WebViewer" name="WebViewer" component={WebViewer} />
    </Navigator>
  );
};

export default memo(SharedNavigator);
