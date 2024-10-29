import { useCallback } from 'react';
import { Linking, Platform } from 'react-native';
import { Logger } from '@services';

export interface LinkingProps {
  ios: {
    action: string;
  };
  android: {
    action: string;
    extras?: Array<{
      key: string;
      value: string | number | boolean;
    }>;
  };
  fallback?: () => void;
}

export const useLinking = () => {
  const linkingHandler = useCallback(async ({ ios, android, fallback }: LinkingProps) => {
    try {
      if (
        android.action.includes('intent.android.action') ||
        android.action.includes('android.settings')
      ) {
        if (Platform.OS === 'ios') {
          await Linking.openURL(ios.action);
        } else {
          await Linking.sendIntent(android.action, android.extras);
        }
      } else {
        const supported = await Linking.canOpenURL(android.action);
        if (supported) {
          await Linking.openURL(Platform.OS === 'ios' ? ios.action : android.action);
        }
      }
    } catch (e: any) {
      fallback && fallback();
      Logger.log('useLinking - linkingHandler', { e });
    }
  }, []);

  return { linkingHandler };
};
