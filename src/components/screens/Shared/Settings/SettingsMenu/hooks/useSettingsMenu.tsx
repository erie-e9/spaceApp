import { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCopy } from '@services';
import { type ApplicationScreenProps, type MenuItemProps } from '@types';
import { isEmpty, screen_height } from '@utils/functions';
import {
  useAppAlerts,
  useAppPreferences,
  useAuthenticationHook,
  useBiometrics,
  useLinking,
  useModal,
} from '@hooks';
import { Switch } from '@components/molecules';
import { AppearanceSelector } from '@components/organisms';
import * as resources from '@services/translations/resources';
import languagesList from '@assets/shared/languagesList.json';

export const useSettingsMenu = (): {
  listItems: Array<MenuItemProps>;
} => {
  const navigation = useNavigation<ApplicationScreenProps>();
  const { getCopyValue } = useCopy();
  const { showModal } = useModal();
  const { linkingHandler } = useLinking();
  const { token } = useAuthenticationHook();
  const { checkBiometrics, authtBiometics } = useBiometrics();
  const { mode, language, biometrics, switchBiometrics } = useAppPreferences();
  const { showAskForAuthAlert } = useAppAlerts();
  const isAuthenticated = !isEmpty(token);

  const currentModeLabel = useMemo(() => {
    if (!mode) {
      return getCopyValue(
        'menu:Menu.settings.items.appPreferences.items.changeAppearance.modes.systemMode',
        {
          osDevice: Platform.OS === 'ios' ? 'iOS' : 'Android',
        },
      );
    }
    return `menu:Menu.settings.items.appPreferences.items.changeAppearance.modes.${mode}Mode`;
  }, [mode, getCopyValue]);

  const editFieldHandler = useCallback(
    ({ fieldId, fieldName }: { fieldId: string; fieldName: string }) => {
      navigation.navigate('FieldEditor', { fieldId, fieldName } as never);
    },
    [],
  );

  const verifyAuthHandler = useCallback(
    (onPressActionHandler: () => void) => {
      if (isAuthenticated) {
        onPressActionHandler();
      } else {
        showAskForAuthAlert();
      }
    },
    [isAuthenticated],
  );

  const showAppAppearanceModal = useCallback(() => {
    showModal({
      type: 'bottomsheet',
      title: 'menu:Menu.settings.items.appPreferences.items.changeAppearance.title',
      description: 'menu:Menu.settings.items.appPreferences.items.changeAppearance.description',
      body: <AppearanceSelector />,
      expandable: true,
      dropdownOptions: {
        height: screen_height / 1.7,
        justifyContent: 'center',
      },
    });
  }, [showModal]);

  const showLanguageModal = useCallback(() => {
    showModal({
      type: 'bottomsheet',
      title: 'menu:Menu.settings.items.appPreferences.items.changeLanguage.title',
      description: 'menu:Menu.settings.items.appPreferences.items.changeLanguage.description',
      list: {
        data: [null, ...Object.keys(resources)],
        predefinedList: 'languages',
      },
      expandable: true,
      dropdownOptions: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        autoCloseOnSelect: true,
      },
    });
  }, [showModal]);

  const toggleBiometrics = useCallback(
    async (value: boolean) => {
      const { biometryType } = await checkBiometrics();

      switchBiometrics(value);
      if (value) {
        const signed = await authtBiometics({
          promptMessage: getCopyValue(
            'menu:Menu.settings.items.security.items.authentication.items.useFingerprint.prompTitleEnableBiometrics',
            {
              biometryType: biometryType,
            },
          ),
          payload: 'payload',
        });
        if (signed) {
          switchBiometrics(true);
        } else {
          switchBiometrics(false);
        }
      }
    },
    [biometrics, switchBiometrics],
  );

  const SwitchElement = useMemo(() => {
    return (
      <Switch
        size={23}
        color={'secondary950'}
        name="fingerPrint"
        activated={biometrics}
        showIndicators={false}
        onChange={(value: boolean) => verifyAuthHandler(() => toggleBiometrics(value))}
      />
    );
  }, [biometrics, toggleBiometrics, verifyAuthHandler]);

  const listItems = useMemo(() => {
    const appPreferencesItems: MenuItemProps['items'] = [
      {
        testID: 'preferencesAppearanceButton',
        title: 'menu:Menu.settings.items.appPreferences.items.changeAppearance.title',
        description: 'menu:Menu.settings.items.appPreferences.items.changeAppearance.description',
        leftIcon: 'cellphone',
        selectedOption: currentModeLabel,
        onPress: showAppAppearanceModal,
        remoteFeatureFlags: ['changeMode', 'and', 'changeTheme', 'or', 'changeAppearance'],
      },
      {
        testID: 'preferencesChangeLanguageButton',
        title: 'menu:Menu.settings.items.appPreferences.items.changeLanguage.title',
        description: 'menu:Menu.settings.items.appPreferences.items.changeLanguage.description',
        leftIcon: 'language',
        selectedOption: `${
          language !== null
            ? languagesList[language].nativeName
            : getCopyValue(
                'menu:Menu.settings.items.appPreferences.items.changeLanguage.languages.fromPhoneDevice',
                {
                  osDevice: Platform.OS === 'ios' ? 'iOS' : 'Android',
                },
              )
        }`,
        onPress: showLanguageModal,
        remoteFeatureFlags: ['changeLanguage'],
      },
      {
        testID: 'preferencesNotificationsButton',
        title: 'menu:Menu.settings.items.appPreferences.items.notifications.title',
        description: 'menu:Menu.settings.items.appPreferences.items.notifications.description',
        rightIcon: 'right',
        leftIcon: 'bellsettings',
        onPress: () =>
          linkingHandler({
            ios: {
              action: `app-settings://notification/${process.env.APP_PACKAGE_NAME_IOS || ''}`,
            },
            android: {
              action: 'android.settings.APP_NOTIFICATION_SETTINGS',
              extras: [
                {
                  key: 'android.provider.extra.APP_PACKAGE',
                  value: process.env.APP_PACKAGE_NAME_ANDROID || '',
                },
              ],
            },
          }),
        remoteFeatureFlags: ['notificationSettings'],
      },
    ];

    const securityItems: MenuItemProps['items'] = [
      {
        testID: 'securityEditPasswordButton',
        title: 'menu:Menu.settings.items.security.items.authentication.items.changePassword.title',
        description:
          'menu:Menu.settings.items.security.items.authentication.items.changePassword.description',
        rightIcon: 'right',
        leftIcon: 'password',
        onPress: () =>
          verifyAuthHandler(() => editFieldHandler({ fieldId: 'password', fieldName: 'password' })),
        remoteFeatureFlags: ['editPassword'],
        disabled: !isAuthenticated,
      },
      {
        testID: 'securityFingerPrintButton',
        title: 'menu:Menu.settings.items.security.items.authentication.items.useFingerprint.title',
        description:
          'menu:Menu.settings.items.security.items.authentication.items.useFingerprint.description',
        rightBody: SwitchElement,
        leftIcon: 'passwordfingerprint',
        remoteFeatureFlags: ['enableBiometrics'],
        disabled: !isAuthenticated,
      },
      // {
      //   testID: 'securitySafetyTipsButton',
      //   title: 'menu:Menu.settings.items.security.items.info.items.safetyTips.title',
      //   description: 'menu:Menu.settings.items.security.items.info.items.safetyTips.description',
      //   rightIcon: 'right',
      //   leftIcon: 'locksquare',
      //   onPress: () => buttonHandler('contactUs'), //! pending
      //   remoteFeatureFlags: ['safetyTips'],
      // },
    ];

    return [
      {
        title: getCopyValue('menu:Menu.settings.items.appPreferences.title'),
        items: appPreferencesItems,
      },
      {
        title: getCopyValue('menu:Menu.settings.items.security.title'),
        items: securityItems,
      },
    ];
  }, [biometrics, currentModeLabel, language, toggleBiometrics, isAuthenticated]);

  return {
    listItems,
  };
};

export default useSettingsMenu;
