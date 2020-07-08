import { GET_ALL_USER_INFO_REQUEST_SUCCESS } from './actions'

const initialState = {
    cellphone: null,
    password: null,
    userToken: null,
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_USER_INFO_REQUEST_SUCCESS:
            const { cellphone, password, userToken } = action.payload
            return { cellphone, password, userToken }
    
        default:
            return state;
    }
}

export { reducer }