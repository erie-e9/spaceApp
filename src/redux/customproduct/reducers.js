import { GET_DATA_REQUEST_SUCCESS,
        ADD_DATA_REQUEST_SUCCESS
} from './actions'

const initialState = {
    data: [],
    newproducts: [
        // {
        //     _id: 1,
        //     size: 2,
        //     option1: 3,
        //     option2: 1,
        //     option3: 1,
        //     option4: 1,
        //     price: 2423
        // }
    ]
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_DATA_REQUEST_SUCCESS:
            const { data } = action.payload;
            return { data }
        
        case ADD_DATA_REQUEST_SUCCESS:
            if (state.newproducts.length >= 0) {
                const itemFound = state.newproducts.find(
                    (element) => element._id === action.payload.paramItem._id,
                )

                if (itemFound !== undefined) {
                    console.log('encontrado');
                } else {
                    console.log('nuevo∫');
                    state.newproducts.unshift({
                        ...action.payload.paramItem
                    })
                }
            }
            
            return { newproducts: [...state.newproducts] }
        default:
            return state
    }
}

export { reducer }