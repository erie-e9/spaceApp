import React, {Fragment} from 'react'
import {UIManager, SafeAreaView, useColorScheme} from 'react-native'
import {ThemeProvider} from 'styled-components'
import {NavigationContainer} from '@react-navigation/native'
import Navigation from '@components/commons/Navigation'
import { lightTheme, darkTheme, navLightMode, navDarkMode } from '@utils/constants'
import {enableScreens} from 'react-native-screens'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './src/store'

enableScreens()

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const App = () => {
  const colorSchema = useColorScheme()
  console.disableYellowBox = true
  return (
    <Fragment>
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor:
            colorSchema === 'dark'
              ? darkTheme.PRIMARY_TEXT_BACKGROUND_COLOR
              : lightTheme.PRIMARY_TEXT_BACKGROUND_COLOR,
        }}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            colorSchema === 'dark'
              ? darkTheme.PRIMARY_TEXT_BACKGROUND_COLOR
              : lightTheme.PRIMARY_TEXT_BACKGROUND_COLOR,
        }}>
        <ThemeProvider theme={colorSchema === 'dark' ? darkTheme : lightTheme}>
          <ReduxProvider store={store}>
            <NavigationContainer
              theme={colorSchema === 'dark' ? navDarkMode : navLightMode}>
              <Navigation />
            </NavigationContainer>
          </ReduxProvider>
        </ThemeProvider>
      </SafeAreaView>
    </Fragment>
  )
}

export default App
