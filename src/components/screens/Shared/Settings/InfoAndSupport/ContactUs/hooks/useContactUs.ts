import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ApplicationScreenProps } from '@utils/@types/navigation';
import { Logger } from '@services';

export const useContactUs = (): {
  listItems: Array<any>;
} => {
  const navigation = useNavigation<ApplicationScreenProps>();

  const wayOfContactHandler = useCallback(
    (
      way:
        | 'email'
        | 'facebook'
        | 'instagram'
        | 'phone'
        | 'telegram'
        | 'whatsapp',
    ) => {
      switch (way) {
        case 'email':
          Logger.log('wayOfContactHandler', { way });
          break;
        case 'facebook':
          Logger.log('wayOfContactHandler', { way });
          break;
        case 'instagram':
          Logger.log('wayOfContactHandler', { way });
          break;
        case 'phone':
          Logger.log('wayOfContactHandler', { way });
          break;
        case 'telegram':
          Logger.log('wayOfContactHandler', { way });
          break;
        case 'whatsapp':
          Logger.log('wayOfContactHandler', { way });
          break;
        default:
          break;
      }
      navigation.navigate('InfoAndSupportMenu');
    },
    [],
  );

  const listItems = useMemo(() => {
    return [
      {
        testID: 'contactUsViaEmail',
        onPress: () => wayOfContactHandler('email'),
        icon: 'EmailIcon',
        remoteConfig: 'contactUsViaEmail',
      },
      {
        testID: 'contactUsViaFacebook',
        onPress: () => wayOfContactHandler('facebook'),
        icon: 'FacebookIcon',
        remoteConfig: 'contactUsViaFacebook',
      },
      {
        testID: 'contactUsViaInstagram',
        onPress: () => wayOfContactHandler('instagram'),
        icon: 'InstagramIcon',
        remoteConfig: 'contactUsViaInstagram',
      },
      {
        testID: 'contactUsViaCall',
        onPress: () => wayOfContactHandler('phone'),
        icon: 'PhoneIcon',
        remoteConfig: 'contactUsViaCall',
      },
      {
        testID: 'contactUsViaTelegram',
        onPress: () => wayOfContactHandler('telegram'),
        icon: 'TelegramIcon',
        remoteConfig: 'contactUsViaTelegram',
      },
      {
        testID: 'contactUsViaWhatsApp',
        onPress: () => wayOfContactHandler('whatsapp'),
        icon: 'WhatsAppIcon',
        remoteConfig: 'contactUsViaWhatsApp',
      },
    ];
  }, []);

  return {
    listItems,
  };
};

export default useContactUs;
