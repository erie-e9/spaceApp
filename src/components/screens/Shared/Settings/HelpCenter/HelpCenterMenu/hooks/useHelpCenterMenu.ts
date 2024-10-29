import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { type ApplicationScreenProps, type MenuItemProps } from '@types';

export const useHelpCenterMenu = (): {
  listItems: Array<MenuItemProps>;
} => {
  const navigation = useNavigation<ApplicationScreenProps>();

  const navigateToScreen = useCallback(
    (screen: string, params?: object) => {
      navigation.navigate(screen as ApplicationScreenProps, params as never);
    },
    [navigation],
  );

  const listItems = useMemo(() => {
    return [
      {
        title: 'menu:helpCenter.info.title',
        items: [
          {
            testID: 'aboutUsButton',
            title: 'menu:helpCenter.info.items.aboutUs.title',
            description: 'menu:helpCenter.info.items.aboutUs.description',
            leftIcon: 'infocircle',
            rightIcon: 'right',
            onPress: () => navigateToScreen('Info', { type: 'aboutUs' }),
            remoteFeatureFlags: ['aboutUs'],
          },
          {
            testID: 'termsOfUseButton',
            title: 'menu:helpCenter.info.items.termsOfUse.title',
            description: 'menu:helpCenter.info.items.termsOfUse.description',
            leftIcon: 'layersintersect',
            rightIcon: 'right',
            onPress: () => navigateToScreen('Info', { type: 'termsOfUse' }),
            remoteFeatureFlags: ['termsOfUse'],
          },
          {
            testID: 'privacyPolicyButton',
            title: 'menu:helpCenter.info.items.privacyPolicy.title',
            description: 'menu:helpCenter.info.items.privacyPolicy.description',
            leftIcon: 'fileprivacy',
            rightIcon: 'right',
            onPress: () => navigateToScreen('Info', { type: 'privacyPolicy' }),
            remoteFeatureFlags: ['privacyPolicy'],
          },
          {
            testID: 'appPermissonsButton',
            title: 'menu:helpCenter.info.items.appPermissions.title',
            description: 'menu:helpCenter.info.items.appPermissions.description',
            rightIcon: 'right',
            leftIcon: 'advice',
            onPress: () => navigateToScreen('FAQs'), //! pending
            remoteFeatureFlags: ['appPermissions'],
          },
        ],
      },
      {
        title: 'menu:helpCenter.support.title',
        items: [
          {
            testID: 'contactUsButton',
            title: 'menu:helpCenter.support.items.contactUs.title',
            description: 'menu:helpCenter.support.items.contactUs.description',
            leftIcon: 'chat',
            rightIcon: 'right',
            onPress: () => navigateToScreen('ContactUs'),
            remoteFeatureFlags: ['contactUs'],
          },
          {
            testID: 'faqsButton',
            title: 'menu:helpCenter.support.items.faqs.title',
            description: 'menu:helpCenter.support.items.faqs.description',
            leftIcon: 'help',
            rightIcon: 'right',
            onPress: () => navigateToScreen('FAQs'),
            remoteFeatureFlags: ['faqs'],
          },
          {
            testID: 'bugReporterButton',
            title: 'menu:helpCenter.support.items.bugReporter.title',
            description: 'menu:helpCenter.support.items.bugReporter.short-description',
            rightIcon: 'right',
            leftIcon: 'bugfinder',
            onPress: () => navigateToScreen('BugReporter'),
            remoteFeatureFlags: ['bugReporter'],
          },
        ],
      },
    ];
  }, []);

  return {
    listItems,
  };
};

export default useHelpCenterMenu;
