import { takeEvery, put } from 'redux-saga/effects'
import data from '@utils/notifications.json'
import {
  GET_DATA_REQUEST,
  GET_DATA_REQUEST_SUCCESS,
  TOOGLE_NOTIFICATION,
  TOOGLE_NOTIFICATION_SUCCESS,
} from './actions'

function* handler() {
  yield takeEvery(GET_DATA_REQUEST, getDataRequest)
  yield takeEvery(TOOGLE_NOTIFICATION, toogleNotification)
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

function* toogleNotification(action) {
  const { paramItem } = action.payload
  try {
    yield put({
      type: TOOGLE_NOTIFICATION_SUCCESS,
      payload: {
        data: [],
        paramItem,
      },
    })
  } catch (error) {
    console.log('[Notifications Saga] toogleNotification error: ', error)
  }
}

export { handler }
