// import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import createContext from '@context/createContext';
import AsyncStorage from '@react-native-community/async-storage';

const globalReducer = (state, action) => {
    console.log('state', state);
    console.log('action', action.payload);

    switch(action.type) {
        case 'signIn':
            return {
                message: action.payload.message,
                error: action.payload.error
            };
        case 'signUp':
            return {
                message: action.payload.message,
                error: action.payload.error
            };
        case 'logOut':
            return {
                message: '',
                error: action.payload.error
            };
        case 'getMe':
            return {
                message: action.payload.message,
                error: action.payload.error
            };
        case 'add_error':
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
}

const signIn = dispatch => async (...data) => {
    try {
        // setuserToken('token');
        let userToken = 'token';
        await AsyncStorage.setItem('@userToken', userToken)
        console.log('signIn context');
        const pay = {
            message: userToken,
            error: ''
        }
        
        dispatch({
            type: 'signIn',
            payload: pay
        })

    } catch (error) {
        console.log('signIn: ', error);
        
        dispatch({
            type: 'add_error',
            payload: error
        })
    }
}

const getMe = dispatch => async (...data) => {
    try {
        dispatch({
            type: 'getMe'
        })
    } catch (error) {
        console.log('getMe: ', error);
        
        dispatch({
            type: 'add_error',
            payload: error
        })
    }
}

const signUp = dispatch => async (...data) => {
    try {
        // setuserToken('token');
        let userToken = 'token';
        await AsyncStorage.setItem('@userToken', userToken)
        console.log('signUp context');
        const pay = {
            message: userToken,
            error: ''
        }
        
        dispatch({
            type: 'signUp',
            payload: pay
        })

    } catch (error) {
        console.log('signUp: ', error);
        
        dispatch({
            type: 'add_error',
            payload: error
        })
    }
}

const logOut = dispatch => async () => {
    try {
        // setuserToken(null);
        await AsyncStorage.removeItem('@userToken', error => {
            console.log('Something went wrong removing from local storage:', error);
            
        })
        
        const pay = {
            message: 'User log out',
            error: ''
        }
        
        dispatch({
            type: 'logOut',
            payload: pay
        })

    } catch (error) {
        console.log('logOut: ', error);
        
        dispatch({
            type: 'add_error',
            payload: error
        })
    }
}

export const { Provider, Context } = createContext(
     /* reducer */  globalReducer,
    /* actions*/ { signIn, signUp, logOut },
    /* defaultValues */ { message: '', error: '' }
)