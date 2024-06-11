import React, { memo } from 'react';
import { DefaultTheme } from 'styled-components/native';
import { useCopy } from '@services';
import { useTheme } from '@hooks';
import { ModalHeaderContainer, TitleContainer, StyledText } from './styles';

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
  const { getCopyValue } = useCopy();
  const { darkMode: isDarkMode } = useTheme();
  const defaultTitleColor = titleColor ? titleColor :isDarkMode ? 'secondaryD1' : 'primaryD1';

  return (
    <ModalHeaderContainer testID={testID}>
      {title && (
        <TitleContainer>
          <StyledText type="Headline6" color={defaultTitleColor}>
            {getCopyValue(title)}
          </StyledText>
        </TitleContainer>
      )}
      {description && (
        <StyledText type="Subtitle2" color="tertiaryL5">
          {getCopyValue(description)}
        </StyledText>
      )}
    </ModalHeaderContainer>
  );
};

export default memo(ModalHeader);
