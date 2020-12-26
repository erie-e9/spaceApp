import { 
  GET_DATA_REQUEST_SUCCESS,
  TOGGLE_LANGUAGE_SUCCESS
 } from './actions'
 import * as RNLocalize from 'react-native-localize'
 import en from '@utils/i18n/en'
 import es from '@utils/i18n/es'

const initialState = {
  data: [],
  selectedLanguage: 'en'
}

const languageObj = {
  'en': en,
  'es': es
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST_SUCCESS:
      let { data } = action.payload
      return { data }
    case TOGGLE_LANGUAGE_SUCCESS:
      let { selectedLanguage } = action.payload
      console.log('[reducer] selectedLanguage', selectedLanguage)
      console.log(RNLocalize.getLocales())
      const currentLanguage = RNLocalize.findBestAvailableLanguage(Object.keys(languageObj))
      state.selectedLanguage = currentLanguage?.languageTag || 'en'
      let value = {...languageObj[selectedLanguage]}
      // const value = {...languageObj[selectedLanguage as 'en' || 'es']}
      return { data: state.data, selectedLanguage: 'hola' }

    default:
      return state
  }
}

export { reducer }
