import { GET_ALL_ITEMS_REQUEST_SUCCESS, 
        ADD_TO_CART,
        REMOVE_FROM_CART,
        REMOVE_ITEM_FROM_CART } from './actions'

const initialState = {
    data: []
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_ITEMS_REQUEST_SUCCESS:
            return { data: [...state.data, action.payload.data]}
            
        case ADD_TO_CART:
            if (state.data.length >= 0) {
                let itemFound = state.data.find(
                    (element) => element._id === action.payload.data._id,
                )
    
                if (itemFound) {
                    itemFound.howMany = itemFound.howMany + 1
                } else {
                    state.data.unshift({
                        ...action.payload.data,
                        howMany: 1,
                    })
                }
                
            }
            return  { data: [...state.data] }
        
        case REMOVE_FROM_CART:
            if (state.data.length >= 0) {
                let itemFound = state.data.find(
                    (element) => element._id === action.payload.data,
                )

                if (itemFound.howMany > 1) {
                    itemFound.howMany = itemFound.howMany - 1
                } else {
                    
                    itemFound.howMany = 0
                    if (itemFound.howMany === 0) {
                        for (var i = state.data.length; i--;) {
                            if (state.data[i]._id === action.payload.data) {
                                state.data.splice(i, 1)
                            }
                        }  
                    } 
                }
            }

            return { data: [...state.data] }
        
        case REMOVE_ITEM_FROM_CART:
            if (state.data.length >= 0) {
                let itemFound = state.data.find(
                    (element) => element._id === action.payload.data,
                )

                itemFound.howMany = 0
                if (itemFound.howMany === 0) {
                    for (var i = state.data.length; i--;) {
                        if (state.data[i]._id === action.payload.data) {
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