import React, { useState, useEffect, Fragment } from 'react';
import {
  StatusBar,
  UIManager, 
  SafeAreaView
} from 'react-native';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from '@components/commons/Navbar';
import { lightTheme } from '@utils/constants';
import { Provider as AuthProvider } from '@context';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App: () => React$Node = () => {

  return (
    <Fragment>
      <StatusBar barStyle='dark-content' backgroundColor='#FFF' />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#FFF' }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
          <ThemeProvider theme={lightTheme}>
            <AuthProvider> 
              <NavigationContainer>
                <NavBar />
              </NavigationContainer>
            </AuthProvider>
          </ThemeProvider>
        </SafeAreaView>
    </Fragment>
  );
};

export default App;
