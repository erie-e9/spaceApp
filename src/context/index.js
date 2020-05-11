import React from 'react';
import createContext from '@context/createContext';
import AsyncStorage from '@react-native-community/async-storage';
// import { useNavigation } from '@react-navigation/native';

const globalReducer = (state, action) => {
  console.log('state', state);
  console.log('action', action.payload);

  switch (action.type) {
    case 'restoreToken':
      console.log('restoreToken action', action.payload.data);
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message,
        error: action.payload.error,
        isLoading: false,
        userToken: action.payload.userToken,
      };
    case 'signIn':
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message,
        error: action.payload.error,
        isLoading: false,
        userToken: action.payload.userToken,
      };
    case 'signUp':
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message,
        error: action.payload.error,
        isLoading: false,
        userToken: action.payload.userToken,
      };
    case 'logOut':
      return {
        ...state,
        data: null,
        message: '',
        error: action.payload.error,
        isLoading: false,
        userToken: action.payload.userToken,
      };
    case 'getMe':
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case 'recoveryPass':
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
    case '_error':
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const restoreToken = (dispatch) => async () => {
  let userToken;

  try {
    userToken = await AsyncStorage.getItem('@userToken');
    console.log('restoreToken try', userToken);
  } catch (e) {
    console.log('restoreToken catch');
  }

  const pay = {
    data: '',
    message: 'restoreToken message',
    error: '',
    userToken: userToken,
  };

  dispatch({
    type: 'restoreToken',
    payload: pay,
  });
};

const signIn = (dispatch) => async ({cellphone, password}) => {
  // const navigation = useNavigation();
  console.log('signIn data', {cellphone, password});
  try {
    let userToken = 'token';
    await AsyncStorage.setItem('@userToken', userToken);
    console.log('signIn context');

    const pay = {
      data: '',
      message: 'User looged',
      error: '',
      userToken: userToken,
    };

    dispatch({
      type: 'signIn',
      payload: pay,
    });

    // navigation.navigate('Menu')
  } catch (error) {
    console.log('signIn: ', error);

    dispatch({
      type: '_error',
      payload: error,
    });
  }
};

const getMe = (dispatch) => async (...data) => {
  try {
    dispatch({
      type: 'getMe',
    });
  } catch (error) {
    console.log('getMe: ', error);

    dispatch({
      type: '_error',
      payload: error,
    });
  }
};

const signUp = (dispatch) => async ({
  fullname,
  username,
  cellphone,
  password,
}) => {
  try {
    console.log('signUp data', {fullname, username, cellphone, password});
    let userToken = 'token';
    await AsyncStorage.setItem('@userToken', userToken);
    console.log('signUp context');

    const pay = {
      data: '',
      message: 'User registered',
      error: '',
      userToken: userToken,
    };

    dispatch({
      type: 'signUp',
      payload: pay,
    });
  } catch (error) {
    console.log('signUp: ', error);

    dispatch({
      type: '_error',
      payload: error,
    });
  }
};

const logOut = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem('@userToken');

    const pay = {
      data: null,
      message: 'User logged out',
      error: '',
      userToken: null,
    };

    dispatch({
      type: 'logOut',
      payload: pay,
    });
    // navigation.navigate('AuthScreen')
  } catch (error) {
    console.log('logOut: ', error);

    dispatch({
      type: '_error',
      payload: error,
    });
  }
};

const recoveryPass = (dispatch) => async ({cellphone}) => {
  console.log('recoveryPass data', {cellphone});
  try {
    // setuserToken(null);
    let token = await AsyncStorage.getItem('@userToken');

    const pay = {
      data: null,
      message: 'recoveryPass',
      error: '',
      userToken: token,
    };

    dispatch({
      type: 'recoveryPass',
      payload: pay,
    });
    // navigation.navigate('AuthScreen')
  } catch (error) {
    console.log('logOut: ', error);

    dispatch({
      type: '_error',
      payload: error,
    });
  }
};

export const {Provider, Context} = createContext(
  /* reducer */ globalReducer,
  /* actions*/ {restoreToken, signIn, getMe, signUp, logOut, recoveryPass},
  /* defaultValues */ {
    data: null,
    message: null,
    error: null,
    isLoading: true,
    userToken: null,
  },
);
