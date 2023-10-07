import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationStackParamList } from '@utils/@types/navigation';
import { ExampleScreen } from '@components/screens';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={ExampleScreen} />
    </Stack.Navigator>
  );
};

export default memo(MainNavigator);
