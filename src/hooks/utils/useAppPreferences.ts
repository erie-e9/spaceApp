import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage as changeLanguageApp, Logger } from '@services';
import {
  changeTheme,
  changeMode,
  changeLanguage,
  toggleBiometrics,
  storeLanguages,
} from '@slices/shared';
import {
  type AppPreferencesState,
  type Language,
  type Mode,
  type Theme,
  type LanguagesState,
} from '@slices/types';

export const useAppPreferences = (): {
  theme: Theme;
  switchTheme: (themeParam: Theme) => void;
  switchMode: (modeParam: Mode) => void;
  mode: Mode;
  language: Language;
  switchLanguage: (languageParam: Language) => void;
  saveLanguages: (languagesParam: any) => void;
  languages: any;
  switchBiometrics: (toogleBiometricsParam: boolean) => void;
  biometrics: boolean;
} => {
  const dispatch = useDispatch();

  const { mode, theme, language, biometrics } = useSelector(
    (state: { appPreferences: AppPreferencesState }) => state.appPreferences,
  );

  const switchTheme = useCallback((themeParam: Theme): void => {
    try {
      dispatch(changeTheme({ theme: themeParam }));
    } catch (error) {
      Logger.error('[useAppPreferences] switchTheme:', { error });
    }
  }, []);

  const switchMode = useCallback((modeParam: Mode): void => {
    try {
      dispatch(changeMode({ mode: modeParam }));
    } catch (error) {
      Logger.error('[useAppPreferences] switchMode:', { error });
    }
  }, []);

  const languages = useSelector((state: { languages: LanguagesState }) => state.languages.content);

  const switchLanguage = useCallback((languageParam: Language): void => {
    try {
      dispatch(changeLanguage({ language: languageParam }));
    } catch (error) {
      Logger.error('[useAppPreferences] switchLanguage:', { error });
    } finally {
      changeLanguageApp(languageParam);
    }
  }, []);

  const saveLanguages = useCallback((languagesParam: object): void => {
    try {
      dispatch(storeLanguages({ content: languagesParam }));
    } catch (error) {
      Logger.error('[useAppPreferences] saveLanguages:', { error });
    }
  }, []);

  const switchBiometrics = useCallback((toogleBiometricsParam: boolean) => {
    try {
      dispatch(toggleBiometrics({ biometrics: toogleBiometricsParam }));
    } catch (error) {
      Logger.error('[useAppPreferences] switchBiometrics:', { error });
    }
  }, []);

  return {
    theme,
    switchTheme,
    mode,
    switchMode,
    language,
    switchLanguage,
    saveLanguages,
    languages,
    switchBiometrics,
    biometrics,
  };
};
