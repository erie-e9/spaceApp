import { GET_ALL_ITEMS_REQUEST_SUCCESS, TOOGLE_NOTIFICATION_SUCCESS } from './actions'

const initialState = {
    data: []
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_ITEMS_REQUEST_SUCCESS:
            const { data } = action.payload        
            return { data }
    
        default:
            return state
    }
}

export { reducer }