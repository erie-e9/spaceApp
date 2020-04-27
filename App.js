import React, { useState, useEffect, Fragment } from 'react';
import {
  StatusBar,
  UIManager, 
  SafeAreaView
} from 'react-native';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from '@components/commons/Navbar';
import SplashScreen from '@components/commons/SplashScreen';
import { lightTheme } from '@utils/constants';
import { Provider as AuthProvider } from '@context';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App: () => React$Node = () => {
  const [ appIsReady, setappIsReady ] = useState(false);;

  const _checkIfToken = async () =>{
    // try {
    //     const token = await AsyncStorage.getItem('@icecream');
    //     if(token != null){
    //       store.dispatch(login());
    //     }
    // } catch (error) {
    //     throw error;
    // }
    setTimeout(() => {
      setappIsReady(true)
    }, 1500);
  }

  useEffect(() => {
    _checkIfToken()
  }, []);

  return (
    <Fragment>
      <StatusBar barStyle='dark-content' backgroundColor='#FFF' />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#FFF' }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
          <ThemeProvider theme={lightTheme}>
            {
              appIsReady
              ? <AuthProvider>
                  <NavigationContainer>
                    <NavBar />
                  </NavigationContainer>
                </AuthProvider>
              : <SplashScreen />
            }
          </ThemeProvider>
        </SafeAreaView>
    </Fragment>
  );
};

export default App;
