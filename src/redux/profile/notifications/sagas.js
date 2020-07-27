import { takeEvery, put } from 'redux-saga/effects'
import {
        GET_ALL_ITEMS_REQUEST,
        GET_ALL_ITEMS_REQUEST_SUCCESS,
        TOOGLE_NOTIFICATION,
        TOOGLE_NOTIFICATION_SUCCESS
} from './actions'

function* handler() {
    yield takeEvery(GET_ALL_ITEMS_REQUEST, getAllItemsRequest)
    yield takeEvery(TOOGLE_NOTIFICATION, toogleNotification)
}

function* getAllItemsRequest(action) {
  try {
    yield put({
      type: GET_ALL_ITEMS_REQUEST_SUCCESS,
      payload: {
        data: [],
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