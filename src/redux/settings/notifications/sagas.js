import { takeEvery, put } from 'redux-saga/effects'
import data from '@utils/notifications.json'
import {
  GET_DATA_REQUEST,
  GET_DATA_REQUEST_SUCCESS,
  TOGGLE_NOTIFICATION,
  TOGGLE_NOTIFICATION_SUCCESS,
} from './actions'

function* handler() {
  yield takeEvery(GET_DATA_REQUEST, getDataRequest)
  yield takeEvery(TOGGLE_NOTIFICATION, toggleNotification)
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
    console.log('[Notifications Saga] getDataRequest error: ', error)
  }
}

function* toggleNotification(action) {
  const { paramItem } = action.payload
  try {
    yield put({
      type: TOGGLE_NOTIFICATION_SUCCESS,
      payload: {
        data: [],
        paramItem,
      },
    })
  } catch (error) {
    console.log('[Notifications Saga] toggleNotification error: ', error)
  }
}

export { handler }
