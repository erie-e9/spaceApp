import React, { memo, useCallback } from 'react';
import { useSVG } from '@hooks';
import { CloseButtonContainer, CloseButtonPressable } from './styles';

interface Props {
  testID?: string;
  onPress?: () => void;
}

export const CloseButton: React.FC<Props> = ({ testID, onPress }) => {
  const CloseIcon = useSVG('CloseIcon');

  const handleOnPress = useCallback(() => {
    if (onPress) onPress();
  }, []);

  return (
    <CloseButtonPressable
      testID={testID}
      hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
      onPress={handleOnPress}
    >
      <CloseButtonContainer>
        <CloseIcon />
      </CloseButtonContainer>
    </CloseButtonPressable>
  );
};

CloseButton.defaultProps = {
  testID: 'CloseButtonID',
  onPress: undefined,
};

export default memo(CloseButton);
