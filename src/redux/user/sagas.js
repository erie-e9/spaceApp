import { takeEvery, put } from 'redux-saga/effects'
import {
  SIGNIN,
  SIGNIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  SIGNUP,
  SIGNUP_SUCCESS,
  RECOVERY_PASS,
  RECOVERY_PASS_SUCCESS,
  AUTHSOCIALMEDIA,
  AUTHSOCIALMEDIA_SUCCESS,
  CHECK_TOKEN,
  CHECK_TOKEN_SUCCESS,
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS
} from './actions'
import { LoginManager } from 'react-native-fbsdk'

function* handler() {
  yield takeEvery(SIGNIN, singinUser)
  yield takeEvery(LOGOUT, logoutUser)
  yield takeEvery(SIGNUP, signupUser)
  yield takeEvery(RECOVERY_PASS, recoveryPassUser)
  yield takeEvery(AUTHSOCIALMEDIA, authSocialMedia)
  yield takeEvery(CHECK_TOKEN, checkToken)
  yield takeEvery(GET_USER_DATA, getUserData)
}

function* singinUser(action) {
  const { avatar, fullname, firstname, lastname } = action.payload
  try {
    yield put({
      type: SIGNIN_SUCCESS,
      payload: {
        avatar,
        fullname,
        firstname,
        lastname
      },
    })
  } catch (error) {
    console.log('[User Saga] singinUser error: ', error)
  }
}

function* logoutUser(action) {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
      payload: {
        userToken: null,
      },
    })
    LoginManager.logOut()
  } catch (error) {
    console.log('[User Saga] logoutUser error: ', error)
  }
}

function* signupUser(action) {
  try {
    yield put({
      type: SIGNUP_SUCCESS,
      payload: {
        cellphone: 'ewe9',
        userToken: null,
      },
    })
  } catch (error) {
    console.log('[User Saga] signupUser error: ', error)
  }
}

function* recoveryPassUser(action) {
  try {
    yield put({
      type: RECOVERY_PASS_SUCCESS,
      payload: {
        cellphone: 'ewe9',
        userToken: null,
      },
    })
  } catch (error) {
    console.log('[User Saga] recoveryPassUser error: ', error)
  }
}

function* authSocialMedia(action) {
  try {
    let { userToken } = action.payload
    // console.log('[authSocialMedia] userToken:', userToken)
    yield put({
      type: AUTHSOCIALMEDIA_SUCCESS,
      payload: {
        cellphone: '',
        password: '',
        userToken,
      },
    })
  } catch (error) {
    console.log('[User Saga] authSocialMedia error: ', error)
  }
}

function* checkToken(action) {
  try {
    yield put({
      type: CHECK_TOKEN_SUCCESS,
      payload: {},
    })
  } catch (error) {
    console.log('[User Saga] checkToken error: ', error)
  }
}

function* getUserData(action) {
  try {
    yield put({
      type: GET_USER_DATA_SUCCESS,
      payload: {},
    })
  } catch (error) {
    console.log('[User Saga] getUserData error: ', error)
  }
}

export { handler }
