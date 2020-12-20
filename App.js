import React, { Fragment, useState, useEffect } from 'react'
import { UIManager, useColorScheme, LogBox } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from '@components/commons/Navigation'
import { lightTheme, darkTheme, navLightMode, navDarkMode } from '@utils/constants'
import { enableScreens } from 'react-native-screens'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './src/store'
import OneSignal from 'react-native-onesignal'
import { ToastProvider } from '@etaui/toast/ToastProvider'

enableScreens()

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const App = () => {
  const colorSchema = useColorScheme()
  const [ pickedTheme, setpickedTheme ] = useState(0)
  // console.disableYellowBox = true
  // LogBox.ignoreAllLogs()

  const theme = pickedTheme === 0 ? colorSchema === 'dark' ? navDarkMode : navLightMode : pickedTheme === 1 ? lightTheme : darkTheme

  useEffect(() => { 
    OneSignal.init('7df7e613-b790-43dd-9fda-f9d97f93b190', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption:2
    });

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    }

  }, [])

  const onReceived = (notification) => {
    console.log('Notification received: ', notification);
  }

  const onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  const onIds = (device) => {
    console.log('Device info: ', device);
  }

  return (
    <Fragment>      
      <ReduxProvider store={store}>
        <NavigationContainer
          // theme={colorSchema === 'dark' ? navDarkMode : navLightMode}
          >
            {/* <ThemeProvider theme={colorSchema === 'dark' ? darkTheme : lightTheme}> */}
              <ToastProvider>
                <Navigation />
              </ToastProvider>
            {/* </ThemeProvider> */}
        </NavigationContainer>
      </ReduxProvider>
    </Fragment>
  )
}

export default App
