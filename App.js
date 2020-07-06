import React, {Fragment} from 'react';
import {UIManager, SafeAreaView, useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from '@components/commons/Navigation';
import {Provider as AuthProvider} from '@context';
import {Provider as CartProvider} from '@context/cartContext';
import { lightTheme, darkTheme, navLightMode, navDarkMode } from '@utils/constants';
import {enableScreens} from 'react-native-screens';

enableScreens();

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App: () => React$Node = () => {
  const colorSchema = useColorScheme();
  console.disableYellowBox = true;
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
          <AuthProvider>
            <CartProvider>
              <NavigationContainer
                theme={colorSchema === 'dark' ? navDarkMode : navLightMode}>
                <Navigation />
              </NavigationContainer>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
