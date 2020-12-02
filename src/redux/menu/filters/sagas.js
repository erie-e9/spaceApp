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
  TOGGLE_FILTER_SUCCESS,
  CLEAN_FILTER,
  CLEAN_FILTER_SUCCESS,
  DELETE_FILTERS,
  DELETE_FILTERS_SUCCESS
} from './actions'

function* handler() {
  yield takeEvery(ADD_FILTERS, addFilters)
  yield takeEvery(GET_DATA_REQUEST, getDataRequest)
  yield takeEvery(TOGGLE_MODAL, toggleModal)
  yield takeEvery(GET_FILTERS_REQUEST, getFiltersRequest)
  yield takeEvery(TOGGLE_FILTER, toggleFilter)
  yield takeEvery(CLEAN_FILTER, cleanFilter)
  yield takeEvery(DELETE_FILTERS, deleteFilters)
}

function* addFilters(action) {
  const { paramItem } = action.payload
  try {
    yield put({
      type: ADD_FILTERS_SUCCESS,
      payload: {
        data: [],
        paramItem
      },
    })
  } catch (error) {
    console.log('[Filters Saga] addFilters error: ', error)
  }
}

function* getDataRequest(action) {
  try {
    yield put({
      type: GET_DATA_REQUEST_SUCCESS,
      payload: {
        data: [],
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
    console.log('[Filters Saga] toggleFavorite error: ', error)
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

export { handler }
