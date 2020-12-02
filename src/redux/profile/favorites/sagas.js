import { takeEvery, put } from 'redux-saga/effects'
import {
  GET_DATA_REQUEST,
  GET_DATA_REQUEST_SUCCESS,
  TOGGLE_FAVORITE,
  TOGGLE_FAVORITE_SUCCESS,
} from './actions'

function* handler() {
  yield takeEvery(GET_DATA_REQUEST, getDataRequest)
  yield takeEvery(TOGGLE_FAVORITE, toggleFavorite)
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

function* toggleFavorite(action) {
  const { paramItem } = action.payload

  try {
    yield put({
      type: TOGGLE_FAVORITE_SUCCESS,
      payload: {
        data: [],
        paramItem,
      },
    })
  } catch (error) {
    console.log('[Favorites Saga] toggleFavorite error: ', error)
  }
}

export { handler }
