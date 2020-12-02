import { GET_DATA_REQUEST_SUCCESS_REVIEWS } from './actions'

const initialState = {
  data: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST_SUCCESS_REVIEWS:
      const { data } = action.payload
      return { data }

    default:
      return state
  }
}

export { reducer }
