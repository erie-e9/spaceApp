import { takeEvery, put } from 'redux-saga/effects'
import data from '@utils/customProducts.json'
import {
  GET_DATA_REQUEST,
  GET_DATA_REQUEST_SUCCESS,
  ADD_DATA_REQUEST,
  ADD_DATA_REQUEST_SUCCESS,
} from './actions'

function* handler() {
  yield takeEvery(GET_DATA_REQUEST, getDataRequest)
  yield takeEvery(ADD_DATA_REQUEST, addDataRequest)
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
    console.log('[Custom product Saga] getDataRequest error: ', error)
  }
}

function* addDataRequest(action) {
  const { paramItem } = action.payload
  try {
    yield put({
      type: ADD_DATA_REQUEST_SUCCESS,
      payload: {
        paramItem,
      },
    })
  } catch (error) {
    console.log('[Custom product Saga] addDataRequest error: ', error)
  }
}

export { handler }
