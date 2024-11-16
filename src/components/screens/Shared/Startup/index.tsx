import React, { memo, useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import { Logger } from '@services';
import { useDeviceSecurity, useAppPreferences, useCheckNet, useTheme, getDeviceInfo } from '@hooks';
import { type ApplicationScreenProps } from '@types';
import { type Language } from '@slices/types/appPreferences';
import { useLazyFetchLanguageQuery } from '@hooks/api/languages';
import { InterpolateColorAnimation } from '@components/animated';
import { Loader } from '@components/molecules';
import { ScreenBackground } from '@components/atoms';
import { Container, Brand } from './styles';

export interface StartUpProps {
  navigation: ApplicationScreenProps;
}

export const Startup: React.FC<StartUpProps> = ({ navigation }) => {
  const { checkIsReliableDevice } = useDeviceSecurity();
  const { isOnline } = useCheckNet();
  const { Images } = useTheme();
  const [fetchLanguage, { data, isSuccess }] = useLazyFetchLanguageQuery();
  const { switchLanguage, saveLanguages, language } = useAppPreferences();

  const preInit = async (): Promise<void> => {
    const promises = [
      checkIsReliableDevice({
        fallback: () => navigation.replace('Warning'),
      }),
    ];
    const results = await Promise.all(promises);
    if (!results.includes(false)) {
        await fetchLanguage('en');
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
    Logger.log('Startup init', { deviceInfo });

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, 3000),
    );
    await preInit();
    language !== null && (await switchLanguage(language as Language));
  };

  useEffect(() => {
    if (isSuccess) {
      saveLanguages(data?.id);
    } else {
      init();
    }
  }, [isSuccess]);

  return (
    <ScreenBackground testID="StartupID" type="solid">
      <Container>
        {/* <Brand source={Images.logo} /> */}
        <Loader width={150} height={75} />
      </Container>
    </ScreenBackground>
  );
};

export default memo(Startup);
