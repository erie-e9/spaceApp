import React, { useLayoutEffect, useMemo } from 'react';
import { RouteProp } from '@react-navigation/core';
import { useCopy } from '@services';
import {
  ApplicationStackParamList,
  ApplicationScreenProps,
} from 'types/navigation';
import { Info as InfoLayout } from '@components/templates';
import Body from './components/Body';

interface Props {
  navigation: ApplicationScreenProps;
  route: RouteProp<ApplicationStackParamList, 'Info'>;
}

export const Info: React.FC<Props> = ({ navigation, route }) => {
  // Page Parameters
  const { type } = route.params;

  // Global Hooks
  const { getCopyValue } = useCopy();
  const headerTitle = useMemo(
    () => `settings:infoAndSupport.info.items.${type}.title`,
    [type],
  );

  // useEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      title: getCopyValue(headerTitle),
    });
  }, []);

  return <InfoLayout body={<Body type={type} />} />;
};
