import { takeEvery, put } from 'redux-saga/effects'
import { SIGNIN, 
        SIGNIN_SUCCESS, 
        LOGOUT, 
        LOGOUT_SUCCESS,
        SIGNUP,
        SIGNUP_SUCCESS,
        RECOVERY_PASS,
        RECOVERY_PASS_SUCCESS
    } from './actions'

function* handler() {
    yield takeEvery(SIGNIN, singinUser)
    yield takeEvery(LOGOUT, logoutUser)
    yield takeEvery(SIGNUP, signupUser)
    yield takeEvery(RECOVERY_PASS, recoveryPassUser)
}

function* singinUser(action) {
    
    try {
        const userToken = 'token'

        yield put({
            type: SIGNIN_SUCCESS,
            payload: {
                cellphone: 'r1d24',
                password: 'rosalia11',
                userToken
            }
        })
    } catch (error) {
        console.log('Sign in error: ', error)
    }
}

function * logoutUser(action) {
    try {
        yield put({
            type: LOGOUT_SUCCESS,
            payload: {
                userToken: null
            }
        })
    } catch (error) {
        console.log('Log out error: ', error)
    }
}

function* signupUser(action) {
    try {
        yield put({
            type: SIGNUP_SUCCESS,
            payload: {
                cellphone: 'ewe9',
                userToken: null
            }
        })
    } catch (error) {
        console.log('signup error: ', error);
    }
}

function* recoveryPassUser(action) {
    try {
        yield put({
            type: RECOVERY_PASS_SUCCESS,
            payload: {
                cellphone: 'ewe9',
                userToken: null
            }
        })
    } catch (error) {
        console.log('recoveryPass error: ', error);
    }
}

export { handler }