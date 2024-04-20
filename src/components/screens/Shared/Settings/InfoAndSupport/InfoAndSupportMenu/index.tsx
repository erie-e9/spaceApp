import React, { memo } from 'react';
import { useInfoAndSupportMenu } from './hooks/useInfoAndSupportMenu';
import { InterpolateColorAnimation } from '@components/animated';
import { SettingsList } from '@components/organisms';
import { BodyContainer } from './styles';

export const InfoAndSupportMenu: React.FC = () => {
  const { listItems } = useInfoAndSupportMenu();

  return (
    <InterpolateColorAnimation isScreen>
      <BodyContainer>
        <SettingsList listItems={listItems} />
      </BodyContainer>
    </InterpolateColorAnimation>
  );
};

export default memo(InfoAndSupportMenu);
