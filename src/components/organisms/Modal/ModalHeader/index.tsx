import React, { memo } from 'react';
import { useTheme } from 'styled-components';
import { useCopy } from '@services/copyLibrary';
import { ModalHeaderContainer, TitleWrapper, StyledText } from './styles';

export interface ModalHeaderProps {
  testID?: string;
  title?: string;
  description?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  testID,
  title,
  description,
}) => {
  const theme = useTheme();
  const { getCopyValue } = useCopy();
  const isDarkMode = theme.mode === 'dark';
  const defaultTitleColor = isDarkMode ? 'secondaryD1' : 'primaryD1';

  return (
    <ModalHeaderContainer testID={testID}>
      {title && (
        <TitleWrapper>
          <StyledText type="Headline6" color={defaultTitleColor}>
            {getCopyValue(title)}
          </StyledText>
        </TitleWrapper>
      )}
      {description && (
        <StyledText type="Body2" color="opposing">
          {getCopyValue(description)}
        </StyledText>
      )}
    </ModalHeaderContainer>
  );
};

ModalHeader.defaultProps = {
  testID: 'ModalHeaderID',
  title: '',
  description: '',
};

export default memo(ModalHeader);
