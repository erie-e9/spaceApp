import React, {useEffect, useContext} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import {ETANetInfo} from '@etaui';
import {Context} from '@context';
import SigninStackScreen from './SigninStack';
import BottomTabNavigator from './BottomTabNavigator';
import SplashScreen from '@components/commons/SplashScreen';
import {lightTheme, darkTheme} from '@utils/constants';

////////////////////////////////////////////////////////////
const Navbar = () => {
  const {restoreToken, state} = useContext(Context);
  const colorSchema = useColorScheme();

  useEffect(() => {
    setTimeout(() => {
      restoreToken();
      console.warn('Navbar', state);
    }, 2000);
  }, []);

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar
        backgroundColor={
          colorSchema === 'dark'
            ? darkTheme.PRIMARY_COLOR
            : lightTheme.PRIMARY_TEXT_BACKGROUND_COLOR
        }
        barStyle="dark-content"
        hidden={false}
      />
      <ETANetInfo />
      {state.userToken !== null ? (
        <BottomTabNavigator />
      ) : (
        <SigninStackScreen />
      )}
    </>
  );
};

export default Navbar;
