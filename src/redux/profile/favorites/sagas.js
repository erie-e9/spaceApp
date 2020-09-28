import { takeEvery, put } from 'redux-saga/effects'
import {
  GET_DATA_REQUEST,
  GET_DATA_REQUEST_SUCCESS,
  TOOGLE_FAVORITE,
  TOOGLE_FAVORITE_SUCCESS,
} from './actions'

function* handler() {
  yield takeEvery(GET_DATA_REQUEST, getDataRequest)
  yield takeEvery(TOOGLE_FAVORITE, toogleFavorite)
}

function* getDataRequest(action) {
  try {
    yield put({
      type: GET_DATA_REQUEST_SUCCESS,
      payload: {
        data: [],
      },
    })
  } catch (error) {
    console.log('[Favorites Saga] getDataRequest error: ', error)
  }
}

function* toogleFavorite(action) {
  const { paramItem } = action.payload
  try {
    yield put({
      type: TOOGLE_FAVORITE_SUCCESS,
      payload: {
        data: [],
        paramItem,
      },
    })
  } catch (error) {
    console.log('[Favorites Saga] toogleFavorite error: ', error)
  }
}

export { handler }
