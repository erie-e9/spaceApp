import { 
  ADD_FILTERS_SUCCESS,
  GET_DATA_REQUEST_SUCCESS,
  TOGGLE_MODAL_SUCCESS,
  GET_FILTERS_REQUEST_SUCCESS, 
  TOGGLE_FILTER_SUCCESS,
  CLEAN_FILTER_SUCCESS,
  DELETE_FILTERS_SUCCESS
} from './actions'

const initialState = {
  data: [],
  toggle_modal: false
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_FILTERS_SUCCESS:
      let {paramItem} = action.payload
      if (paramItem.title !== undefined) {
        state.data.unshift({
          ...paramItem
        })
      }
      return { toggle_modal: state.toggle_modal, data: [...state.data] }
    case GET_DATA_REQUEST_SUCCESS:
      return { toggle_modal: state.toggle_modal, data: state.data }
    case TOGGLE_MODAL_SUCCESS:
      let toggle_modal = action.payload.toggle_modal
      return { toggle_modal: toggle_modal, data: state.data}
    case GET_FILTERS_REQUEST_SUCCESS:
      let filters = []
      if (state.data) {
        state.data.forEach(element => {
          if (element.active) {
            filters.unshift({
              ...element
            })
          }
        });
      }
      return { toggle_modal: state.toggle_modal, filters: filters }
    case TOGGLE_FILTER_SUCCESS:
      if (state.data.length > 0) {
        const itemFound = state.data.find(
          (element) => element.title === action.payload.paramItem.title,
        )
        if (itemFound !== undefined) {
          itemFound.active = action.payload.paramItem.active
        }
      }
      return { toggle_modal: state.toggle_modal, data: [...state.data] }
    case CLEAN_FILTER_SUCCESS:
      if (state.data.length > 0) {
        state.data.forEach(item => {
          item.active = false
        })
      }
    return { toggle_modal: state.toggle_modal, data: [...state.data] }
    case DELETE_FILTERS_SUCCESS:
      state.data = []
      return { toggle_modal: state.toggle_modal, data: [...state.data] }
    default:
      return state
  }
}

export { reducer }
