
import { takeEvery, put } from 'redux-saga/effects'
import data from '@utils/productreviews.json'
import { GET_DATA_REQUEST_REVIEWS, GET_DATA_REQUEST_SUCCESS_REVIEWS } from './actions'

function* handler() {
  yield takeEvery(GET_DATA_REQUEST_REVIEWS, getDataRequest)
}

function* getDataRequest(action) {
  try {
    yield put({
      type: GET_DATA_REQUEST_SUCCESS_REVIEWS,
      payload: {
        data: data.data
      },
    })
  } catch (error) {
    console.log('[Sections Saga] getDataRequest error: ', error)
  }
}

export { handler }
