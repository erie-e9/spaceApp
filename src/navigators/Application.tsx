import React, { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  CardStyleInterpolators,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import SplashScreen from 'react-native-lottie-splash-screen';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ErrorBoundary from 'react-native-error-boundary';
import { lightMode } from '@theme/themes/light';
import { darkMode } from '@theme/themes/dark';
import { type ApplicationStackParamList } from '@types';
import { initAppCheck, Logger } from '@services';
import { isEmpty } from '@utils/functions';
import {
  useTheme,
  useToast,
  useCheckNet,
  useAuthenticationHook,
  useAppPreferences,
  useDeviceSecurity,
} from '@hooks';
import AuthNavigator from '@navigators/Auth';
import SharedNavigator from '@navigators/Shared';
import PrivateNavigator from '@navigators/Private';
import {
  CustomFallback,
  FieldEditor,
  Startup,
  Warning,
  Info,
  ContactUs,
} from '@components/screens/Shared';
import { SafeAreaViewProvider, StatusBar } from '@components/atoms';
import { Toast } from '@components/molecules';
import { Modal } from '@components/organisms';

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

const Application = () => {
  const { token } = useAuthenticationHook();
  const { darkMode: darkModeApp, NavigationTheme } = useTheme();
  const { theme: themeApp } = useAppPreferences();
  const { appConnected } = useCheckNet();
  const gestureHandlerRootViewStyle = { flex: 1 };
  const isAuthenticated: boolean = !isEmpty(token);
  const { checkIsReliableDevice } = useDeviceSecurity();
  const [isReliableDevice, setIsReliableDevice] = useState<boolean>(false);

  const mode = (): DefaultTheme => {
    if (darkModeApp) {
      return darkMode(themeApp === 'default' ? 'theme0' : themeApp);
    }
    return lightMode(themeApp === 'default' ? 'theme0' : themeApp);
  };

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    initAppCheck(true);
    const timeOut = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  useEffect(() => {
    if (!appConnected.isConnected) {
      useToast.warning({
        message: 'common:messages.noConnection',
      });
    } else {
      useToast.close();
    }
  }, [appConnected.isConnected, appConnected.type]);

  const handleJSErrorForErrorBoundary = (error: any, stackTrace: string) => {
    Logger.log('handleJSErrorForErrorBoundary: ', { stackTrace, error });
  };

  const checkDevice = useCallback(async () => {
    const deviceReliable = await checkIsReliableDevice({});
    setIsReliableDevice(deviceReliable);
  }, []);

  useLayoutEffect(() => {
    checkDevice();
  }, []);

  return (
    <ThemeProvider theme={mode}>
      <SafeAreaViewProvider>
        <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
          <ErrorBoundary FallbackComponent={CustomFallback} onError={handleJSErrorForErrorBoundary}>
            <GestureHandlerRootView style={gestureHandlerRootViewStyle}>
              <StatusBar />
              <Navigator
                initialRouteName={'Startup'}
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
                <Screen key="Startup" name="Startup" component={Startup} />
                <Screen
                  key="ContactUs"
                  name="ContactUs"
                  component={ContactUs}
                  options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                  }}
                />
                {isReliableDevice ? (
                  <>
                    {isAuthenticated ? ( // All accesible screens only if user is authenticated.
                      <Screen
                        key="Private"
                        name="Private"
                        component={PrivateNavigator}
                        options={{
                          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                      />
                    ) : (
                      <Screen key="Auth" name="Auth" component={AuthNavigator} />
                    )}
                    <Screen // All accesible screens even if user is authenticated or not, both cases.
                      key="Shared"
                      name="Shared"
                      component={SharedNavigator}
                      options={{
                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
                      }}
                    />
                    <Screen
                      key="FieldEditor"
                      name="FieldEditor"
                      component={FieldEditor}
                      options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                      }}
                    />
                    <Screen
                      key="Info"
                      name="Info"
                      component={Info}
                      options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                      }}
                    />
                  </>
                ) : (
                  <Screen
                    key="Warning"
                    name="Warning"
                    component={Warning}
                    options={{
                      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}
                  />
                )}
              </Navigator>
              <Modal />
              <Toast />
            </GestureHandlerRootView>
          </ErrorBoundary>
        </NavigationContainer>
      </SafeAreaViewProvider>
    </ThemeProvider>
  );
};

export default memo(Application);
