import { takeEvery, put } from 'redux-saga/effects'
import { GET_ALL_ITEMS_REQUEST, GET_ALL_ITEMS_REQUEST_SUCCESS } from './actions'
import data from '@utils/branchOffices.json'

function* handler() {
    yield takeEvery(GET_ALL_ITEMS_REQUEST, getAllItemsRequest)
}

function* getAllItemsRequest(action) {
    try {
        yield put({
            type: GET_ALL_ITEMS_REQUEST_SUCCESS,
            payload: {
                data: data.data
            }
        })
    } catch (error) {
        console.log('Branch offices error', error)
    }
}

export { handler }