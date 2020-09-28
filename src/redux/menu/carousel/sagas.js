import { takeEvery, put } from 'redux-saga/effects'
import data from '@utils/carousel.json'
import { GET_DATA_REQUEST, GET_DATA_REQUEST_SUCCESS } from './actions'

function* handler() {
  yield takeEvery(GET_DATA_REQUEST, getDataRequest)
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
    console.log('[Carousel Saga] getDataRequest error: ', error)
  }
}

export { handler }
