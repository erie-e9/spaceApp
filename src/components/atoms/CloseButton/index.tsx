import React, { memo } from 'react';
import { useSVG } from '@hooks';
import { CloseButtonContainer, CloseButtonPressable } from './styles';

interface Props {
  testID?: string;
  onPress?: () => void;
}

export const CloseButton: React.FC<Props> = ({ testID, onPress }) => {
  const CloseButtonIcon = useSVG('CloseButton');

  return (
    <CloseButtonContainer>
      <CloseButtonPressable testID={testID} onPress={onPress}>
        <CloseButtonIcon />
      </CloseButtonPressable>
    </CloseButtonContainer>
  );
};

CloseButton.defaultProps = {
  testID: 'CloseButtonID',
  onPress: undefined,
};

export default memo(CloseButton);
