import { takeEvery, put } from 'redux-saga/effects'
import data from '@utils/menu'
import { GET_DATA_REQUEST, GET_DATA_REQUEST_SUCCESS } from './actions'

function* handler() {
  yield takeEvery(GET_DATA_REQUEST, getDataRequest)
}

function* getDataRequest(action) {
  try {
    yield put({
      type: GET_DATA_REQUEST_SUCCESS,
      payload: {
        data: data.menu2,
        _id: action.payload._id,
      },
    })
  } catch (error) {
    console.log('[Sections Saga] getDataRequest error: ', error)
  }
}

export { handler }
