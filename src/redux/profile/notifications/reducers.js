import { GET_DATA_REQUEST_SUCCESS, TOOGLE_NOTIFICATION_SUCCESS } from './actions'

const initialState = {
    data: [],
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_DATA_REQUEST_SUCCESS:
            const { data } = action.payload
            return { data }
            // return { data: state.data }
        case TOOGLE_NOTIFICATION_SUCCESS:
            console.log('[reducer] TOOGLE_NOTIFICATION_SUCCESS paramItem: ', paramItem);
            if (state.data.length >= 0) {
                const itemFound = state.data.find(
                    (element) => element._id === action.payload.paramItem._id,
                )
        
                if (itemFound === undefined) {
                    state.data.unshift({
                        ...action.payload.paramItem
                    })
                } else {
                    for (var i = state.data.length; i--;) {
                        if (state.data[i]._id === action.payload.paramItem._id) {
                            state.data.splice(i, 1)
                        }
                    }
                }
            }
            return { data: [...state.data] }
    
        default:
            return state
    }
}

export { reducer }