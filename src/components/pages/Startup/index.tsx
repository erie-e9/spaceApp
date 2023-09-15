import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme, useDeviceSecurity, useLanguage, useCheckNet } from '@hooks';
import { Brand } from '@components';
import { setDefaultTheme } from '@slices/shared/appPreferences';
import { ApplicationScreenProps } from 'types/navigation';
import { useLazyFetchLanguageQuery } from '@hooks/api/languages';

const Startup = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters } = useTheme();
  const { checkPhoneIntegrity } = useDeviceSecurity();
  const { appConnected } = useCheckNet();
  const [fetchLanguage, { data, isSuccess }] = useLazyFetchLanguageQuery();
  const { saveLanguages } = useLanguage();
  const preInit = async (): Promise<void> => {
    const promises = [
      checkPhoneIntegrity({
        fallback: () => navigation.replace('WarningScreen'),
      }),
    ];
    const results = await Promise.all(promises);
    if (!results.includes(false)) {
      if (appConnected.isConnected) {
        await fetchLanguage('en');
      }
      await navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  };

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 2000),
    );
    await setDefaultTheme({ theme: 'default', darkMode: null });
    await preInit();
  };

  useEffect(() => {
    if (isSuccess) {
      saveLanguages(data?.WarningScreen);
    } else {
      init();
    }
  }, [isSuccess]);

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
    </View>
  );
};

export { Startup };
