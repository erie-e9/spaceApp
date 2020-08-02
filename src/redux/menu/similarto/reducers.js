import { GET_ALL_ITEMS_REQUEST_SUCCESS, SET_ITEM_VALUE_SUCCESS } from'./actions'

const initialState = {
    data: []
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_ITEMS_REQUEST_SUCCESS:
            const { data } = action.payload
            return { data, _id: action.payload._id }

        case SET_ITEM_VALUE_SUCCESS:
            // console.log('******* action.payload._id', action.payload._id);
            // state._id = action.payload._id
            return { data: state.data, _id: action.payload._id }

        default:
            return state
    }
}

export { reducer }
