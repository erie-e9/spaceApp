// import { NativeModules, Platform } from 'react-native';
import i18n, { Module, Newable, NewableModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as resources from './resources';
// import { Platform, NativeModules } from 'react-native';

const ns = Object.keys(Object.values(resources)[0]);
export const defaultNS = ns[0];
// const defaultLang = 'en';
// const ReactNativeLanguageDetector = {
//   type: 'languageDetector',
//   init: () => {},
//   cacheUserLanguage: () => {},
//   detect: () => {
//     const supportedLanguages = ['en', 'es', 'fr'];
//     const locale =
//       Platform.OS === 'ios'
//         ? NativeModules.SettingsManager?.getDefaultLanguage ||
//           NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
//           ''
//         : NativeModules.I18nManager?.localeIdentifier || '';

//     const [lowerCaseLocale] = locale.split('_');

//     if (supportedLanguages.includes(lowerCaseLocale)) {
//       return lowerCaseLocale;
//     }
//     console.warn(
//       `locale ${lowerCaseLocale} from ${locale} is not supported, defaulting to ${defaultLang}`,
//     );
//     return defaultLang;
//   },
// };

i18n.use(initReactI18next).init({
  ns,
  defaultNS,
  resources: {
    ...Object.entries(resources).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {},
    ),
  },
  lng: 'en', // default language
  fallbackLng: 'en', // back to this language if don't find word for set language.
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  compatibilityJSON: 'v3',
});

export default i18n;
