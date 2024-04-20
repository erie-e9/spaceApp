import React, { memo } from 'react';
import { useCopy } from '@services';
import { useTheme } from '@hooks';
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
  const { getCopyValue } = useCopy();
  const { darkMode: isDarkMode } = useTheme();
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
