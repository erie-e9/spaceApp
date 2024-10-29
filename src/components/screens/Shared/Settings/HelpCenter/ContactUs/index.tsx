import React, { memo } from 'react';
import { InfoHeader } from '@components/molecules';
import { CallToAction } from '@components/templates';
import { ContactMethods } from './components/ContactMethods';
import { ContentContainer, LabelContainer, StyledText } from './styles';

export const ContactUs: React.FC = () => {
  // JSX Components
  return (
    <CallToAction
      title={`menu:helpCenter.support.items.contactUs.title`}
      headerStyle="Secondary"
      backButton
      body={
        <ContentContainer>
          <InfoHeader />
          <LabelContainer>
            <StyledText type="Subtitle2" font="Primary" color="secondary700" textAlign="center">
              {'menu:helpCenter.support.items.contactUs.content.description'}
            </StyledText>
          </LabelContainer>
          <ContactMethods />
        </ContentContainer>
      }
    />
  );
};

export default memo(ContactUs);
