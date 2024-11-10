import React, { memo } from 'react';
import { testProperties } from '@utils/functions';
import { type ModalProps } from '@slices/types';
import { ModalHeaderContainer, TitleContainer, DescriptionContainer, StyledText } from './styles';

export const ModalHeader: React.FC<Partial<ModalProps>> = ({
  testID = 'ModalHeaderID',
  title = '',
  description = '',
  titleColor,
  alignHeader = 'center',
}) => {
  const defaultTitleColor = titleColor || 'typography950';

  return (
    <ModalHeaderContainer {...testProperties(testID)} alignHeader={alignHeader}>
      {title && (
        <TitleContainer>
          <StyledText type="Headline6" weight="normal" color={defaultTitleColor}>
            {title}
          </StyledText>
        </TitleContainer>
      )}
      {description && (
        <DescriptionContainer>
          <StyledText type="Subtitle2" color="typography800">
            {description}
          </StyledText>
        </DescriptionContainer>
      )}
    </ModalHeaderContainer>
  );
};

export default memo(ModalHeader);
