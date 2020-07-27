import { takeEvery, put } from 'redux-saga/effects'
import { GET_ALL_ITEMS_REQUEST, GET_ALL_ITEMS_REQUEST_SUCCESS } from './actions'
import data from '@utils/menu'

function* handler(){
    yield takeEvery(GET_ALL_ITEMS_REQUEST, getAllItemsRequest)
}

function* getAllItemsRequest(action){
    try {
        yield put({
            type: GET_ALL_ITEMS_REQUEST_SUCCESS,
            payload: {
                data: data.menu2,
                _id: action.payload._id
            }
        })
    } catch (error) {
        console.log('Section error: ', error)
    }
}

export { handler}