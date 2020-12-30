import React, {useState, useEffect, useContext} from 'react'
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'
import { I18nManager } from 'react-native'
import en from '@utils/i18n/en'
import es from '@utils/i18n/es'
import fr from '@utils/i18n/fr'

const LanguageContext = React.createContext()

const languageObj = {
  en: en,
  'es': es,
  'fr': fr,
}

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
)

export const LanguageContextProvider = ({children}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  useEffect(() => {
    let isUnMounted = false
    RNLocalize.addEventListener('change', handleLocalizationChange)
    const { languageTag } = RNLocalize.findBestAvailableLanguage(Object.keys(languageObj))
    handleLanguage(languageTag)
    
    return() => {
      isUnMounted = true
    }
  }, [])

  const handleLanguage = (language) => {
    console.log('[handleLanguage] language: ', language);
    setSelectedLanguage(language || 'en')

    translate.cache.clear()
    i18n.translations = { [language]: languageObj[language] }
    i18n.locale = language
  } 

  const handleLocalizationChange = () => {
    let languageCode = RNLocalize.getLocales()
    // console.log('[Cambió we]', languageCode[0].languageCode)
    handleLanguage(languageCode[0].languageCode)
    // console.log(RNLocalize.getLocales());
  }

  const value = {
    ...languageObj[selectedLanguage],
  }
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useTranslation = () => useContext(LanguageContext)