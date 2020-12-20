import { takeEvery, put } from 'redux-saga/effects'
import data from '@utils/languages.json'
import { 
  GET_DATA_REQUEST, 
  GET_DATA_REQUEST_SUCCESS,
  SWITCH_THEME,
  SWITCH_THEME_SUCCESS } from './actions'

function* handler() {
  yield takeEvery(GET_DATA_REQUEST, getDataRequest)
  yield takeEvery(SWITCH_THEME, switchTheme)
}

function* getDataRequest(action) {
  try {
    yield put({
      type: GET_DATA_REQUEST_SUCCESS,
      payload: {
        theme: 0
      },
    })
  } catch (error) {
    console.log('[Themepicker Saga] getDataRequest error: ', error)
  }
}

function* switchTheme(action) {
  let { theme } = action.payload
  // console.log('[Saga] switchTheme: ', theme)
  try {
    yield put({
      type: SWITCH_THEME_SUCCESS,
      payload: {
        theme
      }
    })
  } catch (error) {
    console.log('[Themepicker Saga] switchTheme error: ', error)
  }
}

export { handler }
