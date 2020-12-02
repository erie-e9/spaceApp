import {
  GET_DATA_REQUEST_SUCCESS,
  TOGGLE_FAVORITE_SUCCESS,
} from './actions'

const initialState = {
  data: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST_SUCCESS:
      return { data: state.data }

    case TOGGLE_FAVORITE_SUCCESS:

      if (state.data.length >= 0) {
        const itemFound = state.data.find(
          (element) => element._id === action.payload.paramItem._id,
        )
        console.log('reducer state: ', state);
        if (itemFound === undefined) {
          state.data.unshift({
            ...action.payload.paramItem,
          })
        } else {
          for (let i = state.data.length; i--;) {
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
