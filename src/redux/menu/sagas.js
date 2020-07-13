import { takeEvery, put } from 'redux-saga/effects'
import data from '@utils/menu.json'
import { GET_ALL_ITEMS_REQUEST, GET_ALL_ITEMS_REQUEST_SUCCESS } from './actions'

function* handler() {
  yield takeEvery(GET_ALL_ITEMS_REQUEST, getAllItemsRequest)
}

function* getAllItemsRequest(action) {
  try {
    yield put({
      type: GET_ALL_ITEMS_REQUEST_SUCCESS,
      payload: {
        data,
      },
    })
  } catch (error) {
    console.log('Menu error: ', error)
  }
}

export { handler }
