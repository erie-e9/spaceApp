import { takeEvery, put } from 'redux-saga/effects'
import data from '@utils/similarto'
import {
  GET_DATA_REQUEST,
  GET_DATA_REQUEST_SUCCESS,
  SET_ITEM_VALUE,
  SET_ITEM_VALUE_SUCCESS,
} from './actions'

function* handler() {
  yield takeEvery(GET_DATA_REQUEST, getDataRequest)
  yield takeEvery(SET_ITEM_VALUE, setItemValue)
}

function* getDataRequest(action) {
  try {
    yield put({
      type: GET_DATA_REQUEST_SUCCESS,
      payload: {
        data: data.data
      },
    })
  } catch (error) {
    console.log('[Similar to Saga] getDataRequest error: ', error)
  }
}

function* setItemValue(action) {
  const { _id } = action.payload
  try {
    yield put({
      type: SET_ITEM_VALUE_SUCCESS,
      payload: {
        _id,
      },
    })
  } catch (error) {
    console.log('[Similar to Saga] setItemValue error: ', error)
  }
}

export { handler }
