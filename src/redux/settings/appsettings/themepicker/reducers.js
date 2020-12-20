import { GET_DATA_REQUEST_SUCCESS, SWITCH_THEME_SUCCESS } from './actions'

const initialState = {
  theme: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST_SUCCESS:
      return { theme: state.theme }
    case SWITCH_THEME_SUCCESS:
      let { theme } = action.payload
        state.theme = theme
        // if (theme !== state.theme) {
        // state.theme = theme
      // }
      return { theme: theme }
    default:
      return state
  }
}

export { reducer }
