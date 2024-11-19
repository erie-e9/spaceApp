import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage, storeLanguages } from '@slices/shared';
import { type LanguagesState, type AppPreferencesState, type Language } from '@slices/types';
import { changeLanguage as changeLanguageApp, Logger } from '@services';

export const useLanguage = (): {
  language: Language;
  switchLanguage: (languageParam: Language) => void;
  saveLanguages: (languagesParam: any) => void;
  languages: any;
} => {
  const dispatch = useDispatch();

  const language = useSelector(
    (state: { appPreferences: AppPreferencesState }) => state.appPreferences.language,
  );

  const languages = useSelector((state: { languages: LanguagesState }) => state.languages.content);

  const switchLanguage = (languageParam: Language): void => {
    try {
      dispatch(changeLanguage({ language: languageParam }));
    } catch (error) {
      Logger.error('[useLanguage] switchLanguage:', { error });
    } finally {
      changeLanguageApp(languageParam);
    }
  };

  const saveLanguages = (languagesParam: object): void => {
    try {
      dispatch(storeLanguages({ content: languagesParam }));
    } catch (error) {
      Logger.error('[useLanguage] saveLanguages:', { error });
    }
  };

  return {
    language,
    switchLanguage,
    saveLanguages,
    languages,
  };
};
