import React, { memo, useLayoutEffect, useMemo } from 'react';
import { RouteProp } from '@react-navigation/core';
import { useCopy } from '@services';
import { type ApplicationStackParamList, type ApplicationScreenProps } from '@types';
import { CallToAction } from '@components/templates';
import Body from './components/Body';

export interface InfoProps {
  navigation: ApplicationScreenProps;
  route: RouteProp<ApplicationStackParamList, 'Info'>;
}

export const Info: React.FC<InfoProps> = ({ navigation, route }) => {
  // Page Parameters
  const { type } = route.params;

  // Global Hooks
  const { getCopyValue } = useCopy();

  const headerTitle = useMemo(() => `menu:helpCenter.info.items.${type}.title`, [type]);

  // useEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      title: getCopyValue(headerTitle),
    });
  }, []);

  return (
    <CallToAction
      title={`menu:helpCenter.info.items.${type}.title`}
      headerStyle="Secondary"
      backButton
      body={<Body navigation={navigation} type={type} />}
    />
  );
};

export default memo(Info);
