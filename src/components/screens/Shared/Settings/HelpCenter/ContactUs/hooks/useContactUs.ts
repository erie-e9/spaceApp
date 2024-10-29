import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { type ApplicationScreenProps } from '@types';
import { Logger } from '@services';
import { RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';
import { useLinking } from '@hooks';

interface ContactItem {
  testID: string;
  icon: string;
  onPress: () => void;
  remoteFeatureFlags?: Array<string> | (keyof RemoteConfigFeatures)[];
}

const CONTACT_URLS: Record<string, string> = {
  email: process.env.HELPEMAIL || '',
  facebook: process.env.HELPFACEBOOK || '',
  instagram: process.env.HELPINSTAGRAM || '',
  phone: process.env.HELPPHONE || '',
  telegram: process.env.HELPTELEGRAM || '',
  whatsapp: process.env.HELPWHATSAPP || '',
};

type ContactWay = keyof typeof CONTACT_URLS;

const getUrlPrefix = (way: ContactWay): string => {
  const prefixes: Record<ContactWay, string> = {
    email: 'mailto:',
    phone: 'tel:',
    facebook: '',
    instagram: '',
    telegram: '',
    whatsapp: '',
  };
  return prefixes[way];
};

export const useContactUs = (): {
  listItems: Array<ContactItem>;
} => {
  const { linkingHandler } = useLinking();
  const navigation = useNavigation<ApplicationScreenProps>();

  const handleOpenURL = useCallback(async (url: string) => {
    if (!url) return;
    try {
      linkingHandler({
        ios: {
          action: url,
        },
        android: {
          action: url,
        },
        fallback: () => Logger.log('handleOpenURL', { error: 'URL not supported', url }),
      });
    } catch (error) {
      Logger.log('handleOpenURL', { error, url });
    }
  }, []);

  const wayOfContactHandler = useCallback(
    async (way: ContactWay) => {
      const contactUrl = CONTACT_URLS[way];
      if (!contactUrl) return;

      const url = `${getUrlPrefix(way)}${contactUrl}`;

      try {
        await handleOpenURL(url);
      } catch (error) {
        Logger.log('wayOfContactHandler', { error });
      } finally {
        navigation.navigate('InfoAndSupport', {} as never);
      }
    },
    [handleOpenURL, navigation],
  );

  const listItems = useMemo(() => {
    return [
      {
        testID: 'contactUsViaEmail',
        icon: 'email',
        onPress: () => wayOfContactHandler('email'),
        remoteFeatureFlags: ['contactUsViaEmail'],
      },
      {
        testID: 'contactUsViaFacebook',
        icon: 'facebook',
        onPress: () => wayOfContactHandler('facebook'),
        remoteFeatureFlags: ['contactUsViaFacebook'],
      },
      {
        testID: 'contactUsViaInstagram',
        icon: 'instagram',
        onPress: () => wayOfContactHandler('instagram'),
        remoteFeatureFlags: ['contactUsViaInstagram'],
      },
      {
        testID: 'contactUsViaCall',
        icon: 'phone',
        onPress: () => wayOfContactHandler('phone'),
        remoteFeatureFlags: ['contactUsViaCall'],
      },
      {
        testID: 'contactUsViaTelegram',
        icon: 'telegram',
        onPress: () => wayOfContactHandler('telegram'),
        remoteFeatureFlags: ['contactUsViaTelegram'],
      },
      {
        testID: 'contactUsViaWhatsApp',
        icon: 'whatsapp',
        onPress: () => wayOfContactHandler('whatsapp'),
        remoteFeatureFlags: ['contactUsViaWhatsApp'],
      },
    ];
  }, []);

  return {
    listItems,
  };
};
