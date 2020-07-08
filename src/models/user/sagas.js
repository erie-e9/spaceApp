import { takeEvery, put } from 'redux-saga/effects'
import { GET_ALL_USER_INFO_REQUEST, GET_ALL_USER_INFO_REQUEST_SUCCESS } from './actions'
import AsyncStorage from '@react-native-community/async-storage'

function* handler() {
    yield takeEvery(GET_ALL_USER_INFO_REQUEST, getAllUserInfo)
}

function* getAllUserInfo (action) {
    console.log({action});
    
    try {
        const userToken = 'token'
        AsyncStorage.setItem('@userToken', userToken)

        yield put({
            type: GET_ALL_USER_INFO_REQUEST_SUCCESS,
            payload: {
                cellphone: 'r1d24',
                password: 'rosalia11',
                userToken
            }
        })
    } catch (error) {
        console.log('signIn: ', error)
    }
}

export { handler }