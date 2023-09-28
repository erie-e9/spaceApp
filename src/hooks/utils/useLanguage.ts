import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '@slices/shared/appPreferences';
import { storeLanguages } from '@slices/shared/languages';
import { AppPreferencesState, Language } from '@slices/types/appPreferences';
import { LanguagesState } from '@slices/types/languages';
import { changeLanguage as changeLanguageApp } from '@services/copyLibrary';
import Logger from '@services/logger';

export const useLanguage = (): {
  language: string;
  switchLanguage: (languageParam: Language) => void;
  saveLanguages: (languagesParam: any) => void;
  languages: any;
} => {
  const language = useSelector(
    (state: { appPreferences: AppPreferencesState }) =>
      state.appPreferences.language,
  );
  const languages = useSelector(
    (state: { languages: LanguagesState }) => state.languages.content,
  );

  const dispatch = useDispatch();
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
