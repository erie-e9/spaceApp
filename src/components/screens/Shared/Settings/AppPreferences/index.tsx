import React, { memo } from 'react';
import { useAppPreferences } from './hooks/useAppPreferences';
import { InterpolateColorAnimation } from '@components/animated';
import { SettingsList } from '@components/organisms';
import { BodyContainer } from './styles';

export const AppPreferences: React.FC = () => {
  const { listItems } = useAppPreferences();

  return (
    <InterpolateColorAnimation isScreen>
      <BodyContainer>
        <SettingsList listItems={listItems} />
      </BodyContainer>
    </InterpolateColorAnimation>
  );
};

export default memo(AppPreferences);
