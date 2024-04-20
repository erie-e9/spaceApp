import React, { memo } from 'react';
import { useFAQs } from './hooks/useFAQs';
import { InterpolateColorAnimation } from '@components/animated';
import { SettingsList } from '@components/organisms';
import { BodyContainer } from './styles';

export const FAQs: React.FC = () => {
  const { listItems } = useFAQs();

  return (
    <InterpolateColorAnimation isScreen>
      <BodyContainer>
        <SettingsList listItems={listItems} />
      </BodyContainer>
    </InterpolateColorAnimation>
  );
};

export default memo(FAQs);
