import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Logger } from '@services';
import * as resources from '@services/translations/resources';
import languagesList from '@assets/shared/languagesList.json';
import { AppPreferencesState } from '@slices/types/appPreferences';
import { ApplicationScreenProps } from '@utils/@types/navigation';
import { changeTheme } from '@slices/shared';
import { useModal, useOptionSelectorModal } from '@hooks';
import { ListItemsProps } from '@components/organisms/SettingsList';

export const useAppPreferences = (): {
  listItems: Array<ListItemsProps>;
} => {
  const dispatch = useDispatch();
  const { showModal } = useModal();
  const { optionSelectorModal } = useOptionSelectorModal();
  const navigation = useNavigation<ApplicationScreenProps>();

  const setTheme = useCallback((theme: boolean | null) => {
    dispatch(changeTheme({ theme: 'default', darkMode: theme }));
  }, []);

  const appPreferences = useSelector(
    (state: { appPreferences: AppPreferencesState }) => state.appPreferences,
  );
  // Local consts
  const currentTheme = useMemo(
    () =>
      appPreferences.darkMode === null
        ? 'settings:settings.appPreferences.items.changeTheme.themes.systemTheme'
        : appPreferences.darkMode === true
          ? 'settings:settings.appPreferences.items.changeTheme.themes.darkTheme'
          : 'settings:settings.appPreferences.items.changeTheme.themes.lightTheme',
    [appPreferences.darkMode],
  );

  const listOptions = useMemo(() => {
    return [
      {
        title:
          'settings:settings.appPreferences.items.changeTheme.themes.lightTheme',
        icon: 'LightThemeIcon',
        onPress: () => setTheme(false),
      },
      {
        title:
          'settings:settings.appPreferences.items.changeTheme.themes.darkTheme',
        icon: 'DarkThemeIcon',
        onPress: () => setTheme(true),
      },
      {
        title:
          'settings:settings.appPreferences.items.changeTheme.themes.systemTheme',
        icon: 'CellPhoneIcon',
        onPress: () => setTheme(null),
      },
    ];
  }, [appPreferences.darkMode]);

  const switchThemeHandler = useCallback((): void => {
    optionSelectorModal({
      title: 'settings:settings.appPreferences.items.changeTheme.themes.title',
      listOptions,
      numColumns: listOptions.length,
      centered: true,
    });
  }, []);

  const changeLanguageHandler = useCallback(() => {
    showModal({
      type: 'bottomsheet',
      title: 'languages:switchLanguage.title',
      list: {
        data: Object.keys(resources),
        predefinedList: 'languages',
      },
    });
  }, []);

  const infoAndSupportButtonHandler = useCallback(() => {
    navigation.navigate('InfoAndSupportMenu');
  }, []);

  const navigateToExtra = useCallback((navigateTo: string) => {
    if (navigateTo === 'hackedDevice') {
      navigation.navigate('Warning');
    } else if (navigateTo === 'errorCatcher') {
      navigation.navigate('CustomFallback', {
        error: Error('Mocked error'),
        resetError: () => Logger.error('Mocked error'),
      });
    }
  }, []);

  const listItems = useMemo(() => {
    return [
      // App preferences
      {
        icon: 'CellPhoneIcon',
        title: 'settings:settings.appPreferences.title',
        items: [
          {
            testID: 'settingsSwitchTheme',
            onPress: () => switchThemeHandler(),
            title: 'settings:settings.appPreferences.items.changeTheme.title',
            selectedOption: currentTheme,
            description:
              'settings:settings.appPreferences.items.changeTheme.description',
            remoteConfig: 'changeTheme',
          },
          {
            testID: 'settingsChangeLanguage',
            onPress: () => changeLanguageHandler(),
            title:
              'settings:settings.appPreferences.items.changeLanguage.title',
            selectedOption: `${
              languagesList[appPreferences.language].nativeName
            }`,
            description:
              'settings:settings.appPreferences.items.changeLanguage.description',
            remoteConfig: 'changeLanguage',
          },
        ],
      },
      // Info & support
      {
        icon: 'InfoIcon',
        title: 'settings:settings.infoAndSupport.title',
        items: [
          {
            testID: 'settingsInfoAndSupport',
            onPress: () => infoAndSupportButtonHandler(),
            rightIcon: 'RightIcon',
            description: 'settings:settings.infoAndSupport.items.description',
            remoteConfig: 'infoAndSupport',
          },
        ],
      },
      // Extra
      {
        icon: 'ExtraIcon',
        title: 'settings:settings.extra.title',
        items: [
          {
            testID: 'settingsHackedDevice',
            onPress: () => navigateToExtra('hackedDevice'),
            rightIcon: 'RightIcon',
            title: 'settings:settings.extra.items.hackedDevice.title',
            description:
              'settings:settings.extra.items.hackedDevice.description',
            remoteConfig: 'hackedDevice',
          },
          {
            testID: 'settingsErrorCatcher',
            onPress: () => navigateToExtra('errorCatcher'),
            rightIcon: 'RightIcon',
            title: 'settings:settings.extra.items.errorCatcher.title',
            description:
              'settings:settings.extra.items.errorCatcher.description',
            remoteConfig: 'errorCatcher',
          },
        ],
      },
    ];
  }, [appPreferences, currentTheme]);

  return {
    listItems,
  };
};

export default useAppPreferences;
