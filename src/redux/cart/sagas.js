import { takeEvery, put } from 'redux-saga/effects'
import {
        GET_DATA_REQUEST,
        GET_DATA_REQUEST_SUCCESS,
        ADD_TO_CART,
        ADD_TO_CART_SUCCESS,
        REMOVE_FROM_CART,
        REMOVE_FROM_CART_SUCCESS,
        REMOVE_ITEM_FROM_CART,
        REMOVE_ITEM_FROM_CART_SUCCESS,
} from './actions'

function* handler() {
  yield takeEvery(GET_DATA_REQUEST, getDataRequest)
  yield takeEvery(ADD_TO_CART, addToCart)
  yield takeEvery(REMOVE_FROM_CART, removeFromCart)
  yield takeEvery(REMOVE_ITEM_FROM_CART, removeItemFromCart)
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
    console.log('Cart error: ', error)
  }
}

function* addToCart(action) {
  let { paramItem } = action.payload
  try {
    yield put({
      type: ADD_TO_CART_SUCCESS,
      payload: {
        data: [],
        paramItem
      },
    })
  } catch (error) {
    console.log('Cart add error: ', error)
  }
}

function* removeFromCart(action) {
  let { paramItem } = action.payload
  try {
    yield put({
      type: REMOVE_FROM_CART_SUCCESS,
      payload: {
        data: [],
        paramItem
      },
    })
  } catch (error) {
    console.log('Cart remove error: ', error)
  }
}

function* removeItemFromCart(action) {
  let { paramItem } = action.payload
  try {
    yield put({
      type: REMOVE_ITEM_FROM_CART_SUCCESS,
      payload: {
        data: [],
        paramItem
      },
    })
  } catch (error) {
    console.log('Cart remove item error: ', error)
  }
}

export { handler }
