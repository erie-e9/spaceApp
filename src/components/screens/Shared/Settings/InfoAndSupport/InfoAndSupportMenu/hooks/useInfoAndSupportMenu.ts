import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ApplicationScreenProps } from '@utils/@types/navigation';
import { ListItemsProps } from '@components/organisms/SettingsList';
import { infoType } from '@components/screens/Shared/Settings/InfoAndSupport';

export const useInfoAndSupportMenu = (): {
  listItems: Array<ListItemsProps>;
} => {
  const navigation = useNavigation<ApplicationScreenProps>();

  const infoButtonHandler = useCallback((type: infoType) => {
    navigation.navigate('Info', { type: type });
  }, []);

  const supportButtonHandler = useCallback((navigateTo: string) => {
    navigation.navigate(navigateTo === 'contactUs' ? 'ContactUs' : 'FAQs');
  }, []);

  const listItems = useMemo(() => {
    return [
      {
        icon: 'InfoIcon',
        title: 'settings:infoAndSupport.info.title',
        items: [
          {
            testID: 'infoAndSupportAboutUs',
            onPress: () => infoButtonHandler('aboutUs'),
            title: 'settings:infoAndSupport.info.items.aboutUs.title',
            rightIcon: 'RightIcon',
            description:
              'settings:infoAndSupport.info.items.aboutUs.description',
            remoteConfig: 'aboutUs',
          },
          {
            testID: 'infoAndSupport',
            onPress: () => infoButtonHandler('noticeOfPrivacy'),
            title: 'settings:infoAndSupport.info.items.noticeOfPrivacy.title',
            rightIcon: 'RightIcon',
            description:
              'settings:infoAndSupport.info.items.noticeOfPrivacy.description',
            remoteConfig: 'noticeOfPrivacy',
          },
          {
            testID: 'infoAndSupport',
            onPress: () => infoButtonHandler('termsAndConditions'),
            title:
              'settings:infoAndSupport.info.items.termsAndConditions.title',
            description:
              'settings:infoAndSupport.info.items.termsAndConditions.description',
            rightIcon: 'RightIcon',
            remoteConfig: 'termsAndConditions',
          },
        ],
      },
      {
        icon: 'ChatIcon',
        title: 'settings:infoAndSupport.support.title',
        items: [
          {
            testID: 'settingsChangeLanguage',
            onPress: () => supportButtonHandler('contactUs'),
            title: 'settings:infoAndSupport.support.items.contactUs.title',
            rightIcon: 'RightIcon',
            description:
              'settings:infoAndSupport.support.items.contactUs.description',
            remoteConfig: 'contactUs',
          },
          {
            testID: 'settingsChangeLanguage',
            onPress: () => supportButtonHandler('faq'),
            title: 'settings:infoAndSupport.support.items.faqs.title',
            rightIcon: 'RightIcon',
            description:
              'settings:infoAndSupport.support.items.faqs.description',
            remoteConfig: 'faqs',
          },
        ],
      },
    ];
  }, []);

  return {
    listItems,
  };
};

export default useInfoAndSupportMenu;
