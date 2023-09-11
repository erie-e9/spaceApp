import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '@slices/shared/appPreferences';
import { AppPreferencesState, Language } from '@slices/types/appPreferences';
import { changeLanguage as changeLanguageApp } from '@services/copyLibrary';

export const useLanguage = (): {
  language: string;
  switchLanguage: (languageParam: Language) => void;
} => {
  const language = useSelector(
    (state: { appPreferences: AppPreferencesState }) =>
      state.appPreferences.language,
  );

  const dispatch = useDispatch();
  const switchLanguage = (languageParam: Language): void => {
    try {
      dispatch(changeLanguage({ language: languageParam }));
    } catch (error) {
      console.error('[useLanguage] switchLanguage:', { error });
    } finally {
      changeLanguageApp(languageParam);
    }
  };

  return {
    language,
    switchLanguage,
  };
};
