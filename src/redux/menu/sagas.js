import { takeEvery, put } from 'redux-saga/effects'
import data from '@utils/menu.json'
import { GET_DATA_REQUEST, GET_DATA_REQUEST_SUCCESS } from './actions'

function* handler() {
  yield takeEvery(GET_DATA_REQUEST, getDataRequest)
}

function* getDataRequest(action) {
  try {
    yield put({
      type: GET_DATA_REQUEST_SUCCESS,
      payload: {
        data,
      },
    })
  } catch (error) {
    console.log('[Menu Saga] getDataRequest error: ', error)
  }
}

export { handler }
