import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFlipper } from '@react-navigation/devtools';
import { useTheme, useToast } from '@hooks';
import Logger from '@services/logger';
import { useCopy } from '@services/copyLibrary';
import MainNavigator from './Main';
import { darkTheme, lightTheme } from '@theme/themesi';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApplicationStackParamList } from 'types/navigation';
import { Startup } from '@components/pages/Startup';
import { WarningScreen } from '@components/pages/Shared/WarningScreen';
import { useCheckNet } from '@hooks';
import Toast from '@components/atoms/Toast';
import { Modal } from '@components/organisms';

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

const ApplicationNavigator = () => {
  const { darkMode, NavigationTheme } = useTheme();
  const { appConnected } = useCheckNet();
  const { getCopyValue } = useCopy();

  const gestureHandlerRootViewStyle = { flex: 1 };

  const theme = (): DefaultTheme => {
    if (darkMode) {
      return darkTheme;
    }
    return lightTheme;
  };

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    Logger.log('check connection', {
      isConnected: appConnected.isConnected,
      type: appConnected.type,
      isInternetReachable: appConnected.isInternetReachable,
    });
    if (!appConnected.isConnected) {
      useToast.warning({
        message: getCopyValue('common:messages.noConnection'),
      });
    } else {
      useToast.close({});
    }
  }, [appConnected.isConnected, appConnected.type]);

  useFlipper(navigationRef);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
          <GestureHandlerRootView style={gestureHandlerRootViewStyle}>
            <StatusBar
              translucent
              barStyle={darkMode ? 'light-content' : 'dark-content'}
              backgroundColor="transparent"
            />
            <Navigator
              screenOptions={{
                headerShown: false,
                headerMode: 'screen',
                // SlideFromRightIOS
                ...TransitionPresets.ScaleFromCenterAndroid,
              }}
            >
              <Screen name="Startup" component={Startup} />
              <Screen name="Main" component={MainNavigator} />
              <Screen name="WarningScreen" component={WarningScreen} />
            </Navigator>
            <Modal />
          </GestureHandlerRootView>
          <Toast />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
