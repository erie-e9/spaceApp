import React, { memo } from 'react';
import { DefaultTheme } from 'styled-components/native';
import { testProperties } from '@utils/functions';
import { ModalHeaderContainer, TitleContainer, DescriptionContainer, StyledText } from './styles';

export interface ModalHeaderProps {
  testID?: string;
  title?: string;
  description?: string;
  titleColor?: keyof DefaultTheme['tokens']['colors'];
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  testID = 'ModalHeaderID',
  title = '',
  description = '',
  titleColor,
}) => {
  const defaultTitleColor = titleColor || 'typography950';

  return (
    <ModalHeaderContainer {...testProperties(testID)}>
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
