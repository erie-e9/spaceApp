import { takeEvery, put } from 'redux-saga/effects'
import {
        GET_DATA_REQUEST,
        GET_DATA_REQUEST_SUCCESS,
        TOOGLE_NOTIFICATION,
        TOOGLE_NOTIFICATION_SUCCESS
} from './actions'
import data from '@utils/notifications.json'

function* handler() {
    yield takeEvery(GET_DATA_REQUEST, getDataRequest)
    yield takeEvery(TOOGLE_NOTIFICATION, toogleNotification)
}

function* getDataRequest(action) {
  try {
    yield put({
      type: GET_DATA_REQUEST_SUCCESS,
      payload: {
        // data: [],
        data: data.data,
      },
    })
  } catch (error) {
    console.log('Notifications error: ', error)
  }
}

function* toogleNotification(action) {
  let { paramItem } = action.payload
  try {
    yield put({
      type: TOOGLE_NOTIFICATION_SUCCESS,
      payload: {
        data: [],
        paramItem
      },
    })
  } catch (error) {
    console.log('Notification toogle error: ', error)
  }
}

export { handler }