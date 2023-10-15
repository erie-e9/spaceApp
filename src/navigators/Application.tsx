import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { useFlipper } from '@react-navigation/devtools';
import { ApplicationStackParamList } from 'types/navigation';
import { useCopy, Logger } from '@services';
import { useTheme, useToast, useCheckNet } from '@hooks';
import { darkTheme, lightTheme } from '@theme/themesi';
import { StyledSafeAreaView } from '@components/atoms';
import { Modal, Toast } from '@components/organisms';
import MainNavigator from './Main';
import { StartupScreen } from '@components/screens';
import { WarningScreen } from '@components/screens/Shared/WarningScreen';

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

const ApplicationNavigator = () => {
  const gestureHandlerRootViewStyle = { flex: 1 };
  const { darkMode, NavigationTheme } = useTheme();
  const { appConnected } = useCheckNet();
  const { getCopyValue } = useCopy();

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
    <ThemeProvider theme={theme}>
      <StyledSafeAreaView>
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
                freezeOnBlur: true,
                headerMode: 'screen',
                // SlideFromRightIOS
                ...TransitionPresets.ScaleFromCenterAndroid,
              }}
            >
              <Screen name="StartupScreen" component={StartupScreen} />
              <Screen name="Main" component={MainNavigator} />
              <Screen name="WarningScreen" component={WarningScreen} />
            </Navigator>
            <Modal />
          </GestureHandlerRootView>
          <Toast />
        </NavigationContainer>
      </StyledSafeAreaView>
    </ThemeProvider>
  );
};

export default ApplicationNavigator;
