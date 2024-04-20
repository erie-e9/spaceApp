import React, { memo } from 'react';
import { InterpolateColorAnimation } from '@components/animated';
import { InfoHeader } from '@components/molecules';
import { Body } from './components/Body';
import { ContentContainer } from './components/styles';

export const ContactUs: React.FC = () => {
  // JSX Components
  return (
    <InterpolateColorAnimation isScreen>
      <ContentContainer>
        <InfoHeader />
        <Body />
      </ContentContainer>
    </InterpolateColorAnimation>
  );
};

export default memo(ContactUs);
