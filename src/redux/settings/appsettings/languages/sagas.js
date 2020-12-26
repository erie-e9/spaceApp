import { takeEvery, put } from 'redux-saga/effects'
import data from '@utils/languages.json'
import { GET_DATA_REQUEST,
  GET_DATA_REQUEST_SUCCESS,
  TOGGLE_LANGUAGE,
  TOGGLE_LANGUAGE_SUCCESS } from './actions'

function* handler() {
  yield takeEvery(GET_DATA_REQUEST, getDataRequest)
  yield takeEvery(TOGGLE_LANGUAGE, toggleLanguage)
}

function* getDataRequest(action) {
  try {
    yield put({
      type: GET_DATA_REQUEST_SUCCESS,
      payload: {
        data: data.data,
      },
    })
  } catch (error) {
    console.log('[Languages Saga] getDataRequest error: ', error)
  }
}

function* toggleLanguage(action) {
  let { selectedLanguage } = action.payload.paramItem
  console.log('[Saga]: ', selectedLanguage);
  try {
    yield put({
      type: TOGGLE_LANGUAGE_SUCCESS,
      payload: {
        selectedLanguage: selectedLanguage,
      },
    })
  } catch (error) {
    console.log('[Languages Saga] toggleLanguage error: ', error)
  }
}

export { handler }
