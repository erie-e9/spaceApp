import { takeEvery, put } from 'redux-saga/effects'
import {
        GET_ALL_ITEMS_REQUEST,
        GET_ALL_ITEMS_REQUEST_SUCCESS,
        TOOGLE_FAVORITE,
        TOOGLE_FAVORITE_SUCCESS
} from './actions'

function* handler() {
    yield takeEvery(GET_ALL_ITEMS_REQUEST, getAllItemsRequest)
    yield takeEvery(TOOGLE_FAVORITE, toogleFavorite)
}

function* getAllItemsRequest(action) {
  try {
    yield put({
      type: GET_ALL_ITEMS_REQUEST_SUCCESS,
      payload: {
        data: [],
      },
    })
  } catch (error) {
    console.log('Favorites error: ', error)
  }
}

function* toogleFavorite(action) {
  let { paramItem } = action.payload
  try {
    yield put({
      type: TOOGLE_FAVORITE_SUCCESS,
      payload: {
        data: [],
        paramItem
      },
    })
  } catch (error) {
    console.log('Favorites toogle error: ', error)
  }
}

export { handler }