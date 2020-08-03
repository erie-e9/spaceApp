import {
        GET_DATA_REQUEST_SUCCESS,
        ADD_TO_CART_SUCCESS,
        REMOVE_FROM_CART_SUCCESS,
        REMOVE_ITEM_FROM_CART_SUCCESS,
} from './actions'

const initialState = {
  data: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST_SUCCESS:
      // console.log('state.data:', state.data);
      return { data: state.data }

    case ADD_TO_CART_SUCCESS:
      if (state.data.length >= 0) {
        const itemFound = state.data.find(
          (element) => element._id === action.payload.paramItem._id,
        )

        if (itemFound !== undefined) {
          itemFound.howMany += 1
        } else {
          state.data.unshift({
            ...action.payload.paramItem,
            howMany: 1,
          })
        }
      }
      // console.log('state.data:', state.data);
      return { data: [...state.data] }

    case REMOVE_FROM_CART_SUCCESS:
      if (state.data.length >= 0) {
        const itemFound = state.data.find(
          (element) => element._id === action.payload.paramItem,
        )

        if (itemFound.howMany > 1) {
          itemFound.howMany -= 1
        } else {
          itemFound.howMany = 0
          if (itemFound.howMany === 0) {
            for (var i = state.data.length; i--;) {
              if (
                state.data[i]._id
								=== action.payload.paramItem
              ) {
                state.data.splice(i, 1)
              }
            }
          }
        }
      }

      return { data: [...state.data] }

    case REMOVE_ITEM_FROM_CART_SUCCESS:
      if (state.data.length >= 0) {
        const itemFound = state.data.find(
          (element) => element._id === action.payload.paramItem,
        )

        itemFound.howMany = 0
        if (itemFound.howMany === 0) {
          for (var i = state.data.length; i--;) {
            if (
              state.data[i]._id
							=== action.payload.paramItem
            ) {
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
