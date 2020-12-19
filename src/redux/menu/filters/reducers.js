import { 
  ADD_FILTERS_SUCCESS,
  GET_DATA_REQUEST_SUCCESS,
  TOGGLE_MODAL_SUCCESS,
  GET_FILTERS_REQUEST_SUCCESS, 
  TOGGLE_FILTER_SUCCESS,
  TOGGLE_DISCOUNT_SUCCESS,
  CLEAN_FILTER_SUCCESS,
  DELETE_FILTERS_SUCCESS,
  TOOGLE_SORT_INCREMENT_SUCCESS,
} from './actions'

const initialState = {
  data: [],
  toggle_modal: false,
  increment: undefined,
  discounts: false,
  discountToggle: false
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_FILTERS_SUCCESS:
      let { paramItem, discounts, discountToggle } = action.payload
      if (paramItem.title !== undefined) {
        state.data.unshift({
          ...paramItem
        })
      }
      if (discounts !== undefined) {
        state.discounts = discounts
        state.discountToggle = discountToggle
      }
      return { toggle_modal: state.toggle_modal, data: [...state.data], discounts: state.discounts, discountToggle: state.discountToggle, increment: state.increment }
    case GET_DATA_REQUEST_SUCCESS:
      return { toggle_modal: state.toggle_modal, data: state.data, increment: state.increment, discounts: state.discounts, discountToggle: state.discountToggle, increment: state.increment }
    case TOGGLE_MODAL_SUCCESS:
      let toggle_modal = action.payload.toggle_modal
      return { toggle_modal: toggle_modal, data: state.data, discounts: state.discounts, discountToggle: state.discountToggle, increment: state.increment }
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
      return { toggle_modal: state.toggle_modal, filters: filters, discounts: state.discounts, discountToggle: state.discountToggle, increment: state.increment }
    case TOGGLE_FILTER_SUCCESS:
      if (state.data.length > 0) {
        const itemFound = state.data.find(
          (element) => element.title === action.payload.paramItem.title,
        )
        if (itemFound !== undefined) {
          itemFound.active = action.payload.paramItem.active
        }
      }
      return { toggle_modal: state.toggle_modal, data: [...state.data], discounts: state.discounts, discountToggle: state.discountToggle, increment: state.increment }
    case TOGGLE_DISCOUNT_SUCCESS:
      state.discountToggle = action.payload.paramItem.discountToggle
      console.log('[TOGGLE_DISCOUNT_SUCCESS] discountToggle: ', action.payload);
      return { toggle_modal: state.toggle_modal, data: state.data, discounts: state.discounts, discountToggle: state.discountToggle, increment: state.increment }
    case CLEAN_FILTER_SUCCESS: // All
      if (state.data.length > 0) {
        state.data.forEach(item => {
          item.active = false
        })

        state.discountToggle = false
      }
      return { toggle_modal: state.toggle_modal, data: [...state.data], discounts: state.discounts, discountToggle: state.discountToggle, increment: state.increment }
    case DELETE_FILTERS_SUCCESS:
      state.data = []
      return { toggle_modal: state.toggle_modal, data: [...state.data], discounts: state.discounts, discountToggle: state.discountToggle, increment: state.increment }
    case TOOGLE_SORT_INCREMENT_SUCCESS:
      if (state.data.length > 0) {
      let { paramItem } = action.payload
      state.increment = paramItem.increment
      console.log('TOOGLE_SORT_INCREMENT_SUCCESS paramItem increment: ', state.increment);
        return { toggle_modal: state.toggle_modal, data: state.data, discounts: state.discounts, discountToggle: state.discountToggle, increment: state.increment }
      }
    default:
      return state
  }
}

export { reducer }
