import { useMemo } from 'react';
import { ListItemsProps } from '@components/organisms/SettingsList';

export const useFAQs = (): {
  listItems: Array<ListItemsProps>;
} => {
  const listItems = useMemo(() => {
    return [
      {
        items: [
          {
            testID: 'settingsSwitchTheme',
            leftIcon: 'HelpIcon',
            title:
              'settings:infoAndSupport.support.items.faqs.content.faq1.question',
            description:
              'settings:infoAndSupport.support.items.faqs.content.faq1.answer',
            remoteConfig: 'changeTheme',
          },
          {
            testID: 'settingsChangeLanguage',
            leftIcon: 'HelpIcon',
            title:
              'settings:infoAndSupport.support.items.faqs.content.faq2.question',
            description:
              'settings:infoAndSupport.support.items.faqs.content.faq2.answer',
            remoteConfig: 'changeLanguage',
          },
          {
            testID: 'settingsChangeLanguage',
            leftIcon: 'HelpIcon',
            title:
              'settings:infoAndSupport.support.items.faqs.content.faq3.question',
            description:
              'settings:infoAndSupport.support.items.faqs.content.faq3.answer',
            remoteConfig: 'changeLanguage',
          },
          {
            testID: 'settingsChangeLanguage',
            leftIcon: 'HelpIcon',
            title:
              'settings:infoAndSupport.support.items.faqs.content.faq4.question',
            description:
              'settings:infoAndSupport.support.items.faqs.content.faq4.answer',
            remoteConfig: 'changeLanguage',
          },
          {
            testID: 'settingsChangeLanguage',
            leftIcon: 'HelpIcon',
            title:
              'settings:infoAndSupport.support.items.faqs.content.faq5.question',
            description:
              'settings:infoAndSupport.support.items.faqs.content.faq5.answer',
            remoteConfig: 'changeLanguage',
          },
          {
            testID: 'settingsChangeLanguage',
            leftIcon: 'HelpIcon',
            title:
              'settings:infoAndSupport.support.items.faqs.content.faq6.question',
            description:
              'settings:infoAndSupport.support.items.faqs.content.faq6.answer',
            remoteConfig: 'changeLanguage',
          },
          {
            testID: 'settingsChangeLanguage',
            leftIcon: 'HelpIcon',
            title:
              'settings:infoAndSupport.support.items.faqs.content.faq7.question',
            description:
              'settings:infoAndSupport.support.items.faqs.content.faq7.answer',
            remoteConfig: 'changeLanguage',
          },
          {
            testID: 'settingsChangeLanguage',
            leftIcon: 'HelpIcon',
            title:
              'settings:infoAndSupport.support.items.faqs.content.faq8.question',
            description:
              'settings:infoAndSupport.support.items.faqs.content.faq8.answer',
            remoteConfig: 'changeLanguage',
          },
          {
            testID: 'settingsChangeLanguage',
            leftIcon: 'HelpIcon',
            title:
              'settings:infoAndSupport.support.items.faqs.content.faq9.question',
            description:
              'settings:infoAndSupport.support.items.faqs.content.faq9.answer',
            remoteConfig: 'changeLanguage',
          },
          {
            testID: 'settingsChangeLanguage',
            leftIcon: 'HelpIcon',
            title:
              'settings:infoAndSupport.support.items.faqs.content.faq10.question',
            description:
              'settings:infoAndSupport.support.items.faqs.content.faq10.answer',
            remoteConfig: 'changeLanguage',
          },
        ],
      },
    ];
  }, []);

  return {
    listItems,
  };
};

export default useFAQs;
