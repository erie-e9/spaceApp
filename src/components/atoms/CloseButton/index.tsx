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
      <CloseButtonPressable
        testID={testID}
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        onPress={onPress}
      >
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
