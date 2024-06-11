import React, { memo, useMemo } from 'react';
import { Platform } from 'react-native';
import { useCopy } from '@services';
import { InfoHeader } from '@components/molecules';
import {
  BodyContainer,
  StyledScrollView,
  InfoContainer,
  StyledText,
} from './styles';

interface BodyProps {
  type: string;
}

export const Body: React.FC<BodyProps> = ({ type }) => {
  // Global Hooks
  const { getCopyValue } = useCopy();

  // local variables
  const content = useMemo(
    () => `settings:infoAndSupport.info.items.${type}.content`,
    [type],
  );

  return (
    <BodyContainer>
      <StyledScrollView showsVerticalScrollIndicator>
        <InfoHeader />
        <InfoContainer>
          <StyledText
            type="Subtitle2"
            weight={Platform.OS === 'ios' ? 300 : 100}
            color="tertiaryL5"
            textAlign="justify"
          >
            {getCopyValue(content)}
          </StyledText>
        </InfoContainer>
      </StyledScrollView>
    </BodyContainer>
  );
};

export default memo(Body);
