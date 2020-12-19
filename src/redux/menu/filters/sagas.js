import { takeEvery, put } from 'redux-saga/effects'
import { 
  ADD_FILTERS,
  ADD_FILTERS_SUCCESS,
  GET_DATA_REQUEST,
  GET_DATA_REQUEST_SUCCESS,
  TOGGLE_MODAL,
  TOGGLE_MODAL_SUCCESS,
  GET_FILTERS_REQUEST,
  GET_FILTERS_REQUEST_SUCCESS,
  TOGGLE_FILTER,
  TOGGLE_DISCOUNT,
  TOGGLE_DISCOUNT_SUCCESS,
  TOGGLE_FILTER_SUCCESS,
  CLEAN_FILTER,
  CLEAN_FILTER_SUCCESS,
  DELETE_FILTERS,
  DELETE_FILTERS_SUCCESS,
  TOOGLE_SORT_INCREMENT,
  TOOGLE_SORT_INCREMENT_SUCCESS,
} from './actions'

function* handler() {
  yield takeEvery(ADD_FILTERS, addFilters)
  yield takeEvery(GET_DATA_REQUEST, getDataRequest)
  yield takeEvery(TOGGLE_MODAL, toggleModal)
  yield takeEvery(GET_FILTERS_REQUEST, getFiltersRequest)
  yield takeEvery(TOGGLE_FILTER, toggleFilter)
  yield takeEvery(TOGGLE_DISCOUNT, toggleDiscounts)
  yield takeEvery(CLEAN_FILTER, cleanFilter)
  yield takeEvery(DELETE_FILTERS, deleteFilters)
  yield takeEvery(TOOGLE_SORT_INCREMENT, toogleSortArrayIncrement)
}

function* addFilters(action) {
  const { paramItem, discounts, discountToggle } = action.payload
  try {
    yield put({
      type: ADD_FILTERS_SUCCESS,
      payload: {
        paramItem,
        discounts,
        discountToggle
      },
    })
  } catch (error) {
    console.log('[Filters Saga] addFilters error: ', error)
  }
}

function* getDataRequest(action) {
  const { paramItem, discounts, discountToggle } = action.payload
  try {
    yield put({
      type: GET_DATA_REQUEST_SUCCESS,
      payload: {
        data: [],
        discounts,
        discountToggle
      },
    })
  } catch (error) {
    console.log('[Filters Saga] getDataRequest error: ', error)
  }
}

function* toggleModal(action) {
  const { toggle_modal } = action.payload

  try {
    yield put({
      type: TOGGLE_MODAL_SUCCESS,
      payload: {
        data: [],
        toggle_modal,
      },
    })
  } catch (error) {
    console.log('[Filters Saga] toggleModal error: ', error)
  }
}

function* getFiltersRequest(action) {
  try {
    yield put({
      type: GET_FILTERS_REQUEST_SUCCESS,
      payload: {
        filters: [],
      },
    })
  } catch (error) {
    console.log('[Filters Saga] getFiltersRequest error: ', error)
  }
}

function* toggleFilter(action) {
  const { paramItem } = action.payload
  
  try {
    yield put({
      type: TOGGLE_FILTER_SUCCESS,
      payload: {
        data: [],
        paramItem,
      },
    })
  } catch (error) {
    console.log('[Filters Saga] toggleFilter error: ', error)
  }
}

function* toggleDiscounts(action) {
  const { paramItem } = action.payload
  console.log('[Filters Saga] toggleDiscounts paramItem: ', paramItem);
  try {
    yield put({
      type: TOGGLE_DISCOUNT_SUCCESS,
      payload: {
        paramItem,
      },
    })
  } catch (error) {
    console.log('[Filters Saga] toggleDiscounts error: ', error)
  }
}

function* cleanFilter(action) {
  try {
    yield put({
      type: CLEAN_FILTER_SUCCESS,
      payload: {
        data: [],
      },
    })
  } catch (error) {
    console.log('[Filters Saga] cleanFilter error: ', error)
  }
}

function* deleteFilters(action) {
  try {
    yield put({
      type: DELETE_FILTERS_SUCCESS,
      payload: {
        data: [],
      },
    })
  } catch (error) {
    console.log('[Filters Saga] deleteFilters error: ', error)
  }
}

function* toogleSortArrayIncrement(action) {
  let increment = action.payload.paramItem?.increment
  console.log('[Sagas] paramItem.increment: ', increment);
  try {
    yield put({
      type: TOOGLE_SORT_INCREMENT_SUCCESS,
      payload: {
        data: [],
        paramItem: {
          increment: increment
        },
        discountToggle: false
      }
    })
  } catch (error) {
    console.log('[Filter Saga] toogleSortArrayIncrement error: ', error)
  }
}

export { handler }
