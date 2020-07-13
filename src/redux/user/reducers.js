import {
  SIGNIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  RECOVERY_PASS_SUCCESS,
} from './actions'

const initialState = {
  cellphone: null,
  password: null,
  userToken: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      const { cellphone, password, userToken } = action.payload
      return { cellphone, password, userToken }

    case LOGOUT_SUCCESS:
      return {
        userToken: null,
      }

    case SIGNUP_SUCCESS:
      return {
        cellphone: '6ewe9',
      }
    case RECOVERY_PASS_SUCCESS:
      return {
        cellphone: '6ewe9',
        userToken: null,
      }

    default:
      return state
  }
}

export { reducer }
