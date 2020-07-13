import { takeEvery, put } from 'redux-saga/effects'
import data from '@utils/carousel.json'
import { GET_ALL_ITEMS_REQUEST, GET_ALL_ITEMS_REQUEST_SUCCESS } from './actions'

function* handler() {
  yield takeEvery(GET_ALL_ITEMS_REQUEST, getAllItemsRequest)
}

function* getAllItemsRequest(action) {
  try {
    yield put({
      type: GET_ALL_ITEMS_REQUEST_SUCCESS,
      payload: {
        data: data.data,
      },
    })
  } catch (error) {
    console.log('Carousel error: ', error)
  }
}

export { handler }
