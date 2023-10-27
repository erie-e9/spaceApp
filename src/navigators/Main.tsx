import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationStackParamList } from '@utils/@types/navigation';
import { HomeScreen } from '@components/screens';

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="HomeScreen" component={HomeScreen} />
    </Navigator>
  );
};

export default memo(MainNavigator);
