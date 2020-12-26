import React, {useState, useEffect, useContext} from 'react'
import * as RNLocalize from 'react-native-localize'
import en from '@utils/i18n/en'
import es from '@utils/i18n/es'
import fr from '@utils/i18n/fr'

const LanguageContext = React.createContext()

const languageObj = {
  'en': en,
  'es': es,
  'fr': fr,
}

export const LanguageContextProvider = ({children}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  useEffect(() => {
    let languageCode = RNLocalize.getLocales()
    console.log(languageCode[0].languageCode)
    const currentLanguage = RNLocalize.findBestAvailableLanguage(
      Object.keys(languageObj),
    )

    setSelectedLanguage(currentLanguage?.languageTag || 'en')
  }, [])

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