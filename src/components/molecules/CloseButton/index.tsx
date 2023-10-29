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
    <CloseButtonPressable
      testID={testID}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      onPress={onPress}
    >
      <CloseButtonContainer>
        <CloseButtonIcon />
      </CloseButtonContainer>
    </CloseButtonPressable>
  );
};

CloseButton.defaultProps = {
  testID: 'CloseButtonID',
  onPress: undefined,
};

export default memo(CloseButton);
