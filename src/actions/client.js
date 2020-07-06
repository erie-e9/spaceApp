import { AsyncStorage } from 'react-native'

export function login() {
  return {
    type: 'LOGIN',
  }
}

export function getMe(info) {
  return {
    type: 'GETME',
    info,
  }
}

export function logout() {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('@apptoken')
      return dispatch({
        type: 'LOGOUT',
      })
    } catch (error) {
      throw error
    }
  }
}
