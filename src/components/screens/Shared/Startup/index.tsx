import React, { memo, useLayoutEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import { Logger } from '@services';
import { useDeviceSecurity, useAppPreferences, useCheckNetwork, getDeviceInfo } from '@hooks';
import type { ApplicationScreenProps } from '@types';
import type { Language } from '@slices/types';
import { loadLocale } from '@utils/formatters';
import { Loader } from '@components/molecules';
import { ScreenBackground } from '@components/atoms';
import { Container } from './styles';

export interface StartUpProps {
  navigation: ApplicationScreenProps;
}

export const Startup: React.FC<StartUpProps> = ({ navigation }) => {
  const { checkIsReliableDevice } = useDeviceSecurity();
  const { isOnline } = useCheckNetwork();
  const { switchLanguage, language } = useAppPreferences();

  const preInit = async (): Promise<void> => {
    const promises = [
      checkIsReliableDevice({
        fallback: () => navigation.replace('Warning'),
      }),
    ];
    const results = await Promise.all(promises);
    if (!results.includes(false)) {
      if (isOnline.isConnected) {
      }
      await navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Shared', params: { screen: 'Home' } }],
        }),
      );
    }
  };

  const init = async () => {
    const deviceInfo = await getDeviceInfo();
    Logger.log('Startup init', { deviceInfo, language });
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, 3000),
    );
    await preInit();
    await loadLocale(language);
    language !== null && (await switchLanguage(language as Language));
  };

  useLayoutEffect(() => {
    init();
  }, []);

  return (
    <ScreenBackground testID="StartupID" type="solid">
      <Container>
        <Loader width={150} height={75} />
      </Container>
    </ScreenBackground>
  );
};

export default memo(Startup);
