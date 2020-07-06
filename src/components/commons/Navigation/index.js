import React, {useEffect, useContext} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import {ETANetInfo} from '@etaui';
import {Context} from '@context';
import SigninStackScreen from './SigninStack';
import ShopTabNavigator from './ShopTabNavigator';
import SplashScreen from '@components/commons/SplashScreen';
import {lightTheme, darkTheme} from '@utils/constants';

const Navigation = () => {
  const {restoreToken, state} = useContext(Context);
  const colorSchema = useColorScheme();

  useEffect(() => {
    setTimeout(() => {
      restoreToken();
    }, 2000);
  }, []);

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar
        background-color={
          colorSchema === 'dark'
            ? darkTheme.PRIMARY_TEXT_BACKGROUND_COLOR
            : lightTheme.PRIMARY_TEXT_BACKGROUND_COLOR
        }
        barStyle={colorSchema === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      />
      <ETANetInfo />
      {state.userToken !== null ? <ShopTabNavigator /> : <SigninStackScreen />}
    </>
  );
};

export default Navigation;
