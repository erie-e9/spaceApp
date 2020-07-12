import { takeEvery, put } from 'redux-saga/effects'
import { GET_ALL_ITEMS_REQUEST,
        GET_ALL_ITEMS_REQUEST_SUCCESS,
        ADD_TO_CART,
        REMOVE_FROM_CART,
        REMOVE_ITEM_FROM_CART } from './actions'

function* handler() {
    yield takeEvery(GET_ALL_ITEMS_REQUEST, getAllItemsRequest)
    yield takeEvery(ADD_TO_CART, addToCart)
    yield takeEvery(REMOVE_FROM_CART, removeFromCart)
    yield takeEvery(REMOVE_ITEM_FROM_CART, removeItemFromCart)
}

function* getAllItemsRequest(action) {
    try {
        yield put({
            type: GET_ALL_ITEMS_REQUEST_SUCCESS,
            payload: {
                data: []
            }
        })
    } catch (error) {
        console.log('Cart error: ', error)
    }
}

function* addToCart(action) {
    try {
        yield put({
            type: ADD_TO_CART,
            payload: {
                data: []
            }
        })
    } catch (error) {
        console.log('Cart add error: ', error)
    }
}

function* removeFromCart() {
    try {
        yield put({
            type: REMOVE_FROM_CART,
            payload: {
                data: []
            }
        })
    } catch (error) {
        console.log('Cart remove error: ', error)
    }
}

function* removeItemFromCart() {
    try {
        yield put({
            type: REMOVE_FROM_CART,
            payload: {
                data: []
            }
        })
    } catch (error) {
        console.log('Cart remove item error: ', error)
    }
}

export { handler }