import React, { memo, useEffect } from 'react';
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
// import { useFlipper } from '@react-navigation/devtools';
import ErrorBoundary from 'react-native-error-boundary';
import { ApplicationStackParamList } from 'types/navigation';
import { useCopy, initAppCheck, Logger } from '@services';
import { useTheme, useToast, useCheckNet } from '@hooks';
import { darkTheme, lightTheme } from '@theme/themesi';
import SharedNavigator from './Shared';
import { SafeAreaViewProvider, StatusBar } from '@components/atoms';
import { Toast } from '@components/molecules';
import { Modal } from '@components/organisms';
import { CustomFallback, Startup } from '@components/screens/Shared';

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
    Logger.log('handleJSErrorForErrorBoundary: ', { stackTrace, error });
  };

  // useFlipper(navigationRef);

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
                  ...TransitionPresets.ScaleFromCenterAndroid,
                }}
              >
                <Screen name="Startup" component={Startup} />
                <Screen name="Shared" component={SharedNavigator} />
              </Navigator>
            </GestureHandlerRootView>
            <Toast />
          </ErrorBoundary>
        </NavigationContainer>
      </SafeAreaViewProvider>
    </ThemeProvider>
  );
};

export default memo(Application);
