import {
  SIGNIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  RECOVERY_PASS_SUCCESS,
  AUTHSOCIALMEDIA_SUCCESS,
  CHECK_TOKEN_SUCCESS,
  GET_USER_DATA_SUCCESS
} from './actions'

const initialState = {
  userToken: undefined,
  avatar: null,
  fullname: null,
  firstname: null,
  lastname: null,
  username: null,
  cellphone: null,
  password: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:  
    // console.log('[SIGNIN_SUCCESS]: ', { avatar: action.payload.avatar, fullname: action.payload.fullname, firstname: action.payload.firstname, lastname: action.payload.lastname })
      if (action.payload.avatar !== undefined && action.payload.fullname !== undefined && action.payload.firstname !== undefined && action.payload.lastname) {
        state.avatar = action.payload.avatar
        state.fullname = action.payload.fullname
        state.firstname = action.payload.firstname
        state.lastname = action.payload.lastname
      }
      // console.log('dasdjsaklja: ', state.fullname);
      return { userToken: state.userToken,
        avatar: state.avatar,
        fullname: state.fullname,
        firstname: state.firstname,
        lastname: state.lastname
      }
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
    case AUTHSOCIALMEDIA_SUCCESS:
      // let { userToken } = action.payload
      state.userToken = action.payload.userToken
      // console.log('[AUTHSOCIALMEDIA_SUCCESS] state.userToken:', state.userToken)

      return { userToken: action.payload.userToken }
    case CHECK_TOKEN_SUCCESS:
      // let { userToken } = action.payload
      return { userToken: state.userToken,
              avatar: state.avatar,
              fullname: state.fullname,
              firstname: state.firstname,
              lastname: state.lastname
            }
    case GET_USER_DATA_SUCCESS:
      console.log('GET_USER_DATA_SUCCESS: ', { avatar: state.avatar, fullname: state.fullname, firstname: state.firstname, lastname: state.lastname })
      // if (state.avatar !== undefined && state.fullname !== undefined && state.firstname !== undefined && state.lastname) {
        return { 
          userToken: state.userToken,
          avatar: state.avatar,
          fullname: state.fullname,
          firstname: state.firstname,
          lastname: state.lastname,
        }
      // }

    default:
      return state
  }
}

export { reducer }
