import React, { useEffect } from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import SplashScreen from 'react-native-lottie-splash-screen';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { useFlipper } from '@react-navigation/devtools';
import ErrorBoundary from 'react-native-error-boundary';
import { ApplicationStackParamList } from 'types/navigation';
import { useCopy, initAppCheck } from '@services';
import { useTheme, useToast, useCheckNet } from '@hooks';
import { darkTheme, lightTheme } from '@theme/themesi';
import { SafeAreaViewProvider, StatusBar } from '@components/atoms';
import { Modal, Toast } from '@components/organisms';
import MainNavigator from './Main';
import { Startup, Warning, CustomFallback } from '@components/screens';

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

const Application = () => {
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
    initAppCheck(true);
    let timeOut = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  useEffect(() => {
    if (!appConnected.isConnected) {
      useToast.warning({
        message: getCopyValue('common:messages.noConnection'),
      });
    } else {
      useToast.close();
    }
  }, [appConnected.isConnected, appConnected.type]);

  const handleJSErrorForErrorBoundary = (error: any, stackTrace: string) => {
    console.log('handleJSErrorForErrorBoundary: ', { stackTrace, error });
  };

  useFlipper(navigationRef);

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaViewProvider>
        <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
          <ErrorBoundary
            FallbackComponent={CustomFallback}
            onError={handleJSErrorForErrorBoundary}
          >
            <GestureHandlerRootView style={gestureHandlerRootViewStyle}>
              <StatusBar />
              <Modal />
              <Navigator
                screenOptions={{
                  headerShown: false,
                  freezeOnBlur: true,
                  headerMode: 'screen',
                  // SlideFromRightIOS
                  ...TransitionPresets.ScaleFromCenterAndroid,
                }}
              >
                <Screen name="Startup" component={Startup} />
                <Screen name="Main" component={MainNavigator} />
                <Screen name="Warning" component={Warning} />
                <Screen
                  name="CustomFallback"
                  component={CustomFallback as any}
                />
              </Navigator>
            </GestureHandlerRootView>
            <Toast />
          </ErrorBoundary>
        </NavigationContainer>
      </SafeAreaViewProvider>
    </ThemeProvider>
  );
};

export default Application;
