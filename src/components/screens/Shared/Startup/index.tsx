import React, { memo, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDeviceSecurity, useLanguage, useCheckNet, useTheme } from '@hooks';
import { ApplicationScreenProps } from 'types/navigation';
import { Language } from '@slices/types/appPreferences';
import { useLazyFetchLanguageQuery } from '@hooks/api/languages';
import { InterpolateColorAnimation } from '@components/animated';
import { Container, Brand } from './styles';

interface Props {
  navigation: ApplicationScreenProps;
}

export const Startup: React.FC<Props> = ({ navigation }) => {
  const { checkPhoneIntegrity } = useDeviceSecurity();
  const { appConnected } = useCheckNet();
  const [fetchLanguage, { data, isSuccess }] = useLazyFetchLanguageQuery();
  const { switchLanguage, saveLanguages, language } = useLanguage();
  const { Images } = useTheme();

  const preInit = async (): Promise<void> => {
    const promises = [
      checkPhoneIntegrity({
        fallback: () => navigation.replace('Warning'),
      }),
    ];
    const results = await Promise.all(promises);
    if (!results.includes(false)) {
      if (appConnected.isConnected) {
        await fetchLanguage('en');
      }
      await navigation.reset({
        index: 0,
        routes: [{ name: 'Shared' }],
      });
    }
  };

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 2000),
    );
    await preInit();
    await switchLanguage(language as Language);
  };

  useEffect(() => {
    if (isSuccess) {
      saveLanguages(data?.Warning);
    } else {
      init();
    }
  }, [isSuccess]);

  return (
    <InterpolateColorAnimation isScreen>
      <Container testID="StartupID">
        <Brand source={Images.logo} />
        <ActivityIndicator size={'small'} />
      </Container>
    </InterpolateColorAnimation>
  );
};

export default memo(Startup);
