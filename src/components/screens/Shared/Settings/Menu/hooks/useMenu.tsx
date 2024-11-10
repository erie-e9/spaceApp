import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getReadableVersion } from 'react-native-device-info';
import { Logger } from '@services';
import { type MenuItemProps, type ApplicationScreenProps } from '@types';
import { useAuthenticationHook, useRatingModal, useResponseHandler, useTheme } from '@hooks';
import { isEmpty } from '@utils/functions';

export const useMenu = (): {
  listItems: Array<MenuItemProps>;
  primaryButton: {
    title: string;
    onPress: () => Promise<void>;
    textColor: string;
    testID: string;
    disabled?: boolean;
    loading?: boolean;
  };
} => {
  const { darkMode } = useTheme();
  const { loading, setLoading } = useResponseHandler();
  const { token, removeToken } = useAuthenticationHook();
  const [disableContinueButton, setDisableContinueButton] = useState<boolean>(false);
  const navigation = useNavigation<ApplicationScreenProps>();
  const { ratingModal } = useRatingModal({ navigation });

  const isAuthenticated = !isEmpty(token);

  const navigateToScreen = useCallback(
    (screen: string) => {
      navigation.navigate(screen as ApplicationScreenProps);
    },
    [navigation],
  );

  const listItems: MenuItemProps[] = useMemo(() => {
    const appFeatures: MenuItemProps['items'] = [];

    const appPreferences: MenuItemProps['items'] = [
      {
        testID: 'settingsMenuButton',
        title: 'menu:Menu.screenTitle',
        // description: 'menu:Menu.settings.items.security.description',
        rightIcon: 'right',
        leftIcon: 'settings',
        onPress: () => navigateToScreen('SettingsMenu'),
        remoteFeatureFlags: ['settingsMenu'],
      },
    ];

    const helpCenterItems: MenuItemProps['items'] = [
      {
        testID: 'menuHelpCenterButton',
        title: 'menu:helpCenter.screenTitle',
        rightIcon: 'right',
        leftIcon: 'info',
        onPress: () => navigateToScreen('HelpCenter'),
        remoteFeatureFlags: ['helpCenter'],
      },
      {
        testID: 'menuAppVersionButton',
        title: `${process.env.APP_NAME} v${getReadableVersion()}`, //! pending
        // rightIcon: 'right',
        leftIcon: 'versions',
        // onPress: () => navigateToScreen('CustomFallback'), //! pending
        remoteFeatureFlags: ['versionApp'],
      },
    ];

    if (isAuthenticated) {
      appFeatures.push({
        testID: 'menuNotificationsButton',
        title: 'menu:privateSettings.notificationsCenter.screenTitle',
        rightIcon: 'right',
        leftIcon: 'bell',
        onPress: () =>
          navigation.navigate('Private', {
            screen: 'Notifications',
          } as never),
        remoteFeatureFlags: ['notificatsionCenter'],
      });
    }

    if (process.env.NODE_ENV !== 'production' || process.env.DEBUGGER_MODE) {
      helpCenterItems.push(
        {
          testID: 'menuHackedDeviceButton',
          title: 'menu:Menu.menu.items.untrustedDevice.title',
          // description:
          //   'menu:Menu.menu.items.untrustedDevice.description',
          rightIcon: 'right',
          leftIcon: 'alerttriangle',
          onPress: () => navigateToScreen('Warning'), // needs change value on Application.tsx
          remoteFeatureFlags: ['untrustedDevice'],
        },
        {
          testID: 'menuErrorCatcherButton',
          title: 'menu:Menu.menu.items.errorCatcher.title',
          // description:
          //   'menu:Menu.menu.items.errorCatcher.description',
          rightIcon: 'right',
          leftIcon: 'bug',
          onPress: () => navigateToScreen('CustomFallback'),
          remoteFeatureFlags: ['errorCatcher'],
        },
      );
    }

    if (isAuthenticated) {
      helpCenterItems.push({
        testID: 'menuNotificationsButton',
        title: 'menu:Menu.menu.items.feedbackAndSharing.title',
        rightIcon: 'right',
        leftIcon: 'hearthandshake',
        onPress: () => {
          // ratingModal({
          //   feature_name: 'User auth',
          //   feedback_request_id: '1',
          // });
          navigation.navigate('Private', { screen: 'Tasks' });
        },
        remoteFeatureFlags: ['feedbackAndSharing'],
      });
    }

    return [
      {
        // title: getCopyValue('menu:settings.appFeatures.title'),
        items: appFeatures,
      },
      {
        // title: getCopyValue('menu:Menu.screenTitle'),
        items: appPreferences,
      },
      {
        // title: getCopyValue('menu:Menu.menu.screenTitle'),
        items: helpCenterItems,
      },
    ];
  }, [isAuthenticated, navigateToScreen]);

  const primaryButtonHandler = useCallback(async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        removeToken();
        setDisableContinueButton(false);
        setLoading(false);
      }, 5000);
    } catch (error) {
      Logger.log('useMenu - primaryButtonHandler: ', { error });
    } finally {
    }
  }, [removeToken]);

  const primaryButton = useMemo(() => {
    return {
      testID: 'menuPrimaryButton',
      title: 'authentication:Authentication.form.submitButtons.logOutText',
      textColor: darkMode ? 'tertiary50' : 'secondary950',
      disabled: loading || disableContinueButton,
      loading: loading,
      onPress: primaryButtonHandler,
    };
  }, [loading, darkMode]);

  return {
    listItems,
    primaryButton,
  };
};
