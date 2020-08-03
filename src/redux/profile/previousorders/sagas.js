import { takeEvery, put } from 'redux-saga/effects'
import { GET_DATA_REQUEST, GET_DATA_REQUEST_SUCCESS } from './actions'
import data from '@utils/previousorders.json'

function* handler(){
    yield takeEvery(GET_DATA_REQUEST, getDataRequest)
}

function* getDataRequest(action) {
    try {
        yield put({
            type: GET_DATA_REQUEST_SUCCESS,
            payload: {
                data: data.data
            }
        })
    } catch (error) {
        console.log('Previous orders error: ', error);
    }
}

export { handler }