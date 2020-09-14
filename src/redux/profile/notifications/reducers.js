import { GET_DATA_REQUEST_SUCCESS, TOOGLE_NOTIFICATION_SUCCESS } from './actions'

const initialState = {
    data: [] 
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_DATA_REQUEST_SUCCESS:
            const { data } = action.payload
            return { data }
        case TOOGLE_NOTIFICATION_SUCCESS:
            const { id } = action.payload
            console.log('[reducer] TOOGLE_NOTIFICATION_SUCCESS id: ', id);
            return {id }
    
        default:
            return state
    }
}

export { reducer }