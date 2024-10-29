import React, { memo } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { type ApplicationStackParamList } from '@types';
import { FAQs, HelpCenterMenu, BugReporter } from '@components/screens/Shared';

export type HelpCenterParamsList = {
  FAQs: undefined;
  HelpCenterMenu: undefined;
};

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

export const HelpCenterNavigator = (): React.JSX.Element => {
  return (
    <Navigator
      initialRouteName="HelpCenterMenu"
      screenOptions={{
        animationEnabled: true,
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Screen key="FAQs" name="FAQs" component={FAQs} />
      <Screen key="HelpCenterMenu" name="HelpCenterMenu" component={HelpCenterMenu} />
      <Screen key="BugReporter" name="BugReporter" component={BugReporter} />
    </Navigator>
  );
};

export default memo(HelpCenterNavigator);
