import React, { memo, useCallback } from 'react';
import { testProperties } from '@utils/functions';
import { useSVG } from '@hooks';
import { CloseButtonContainer, CloseButtonPressable } from './styles';

interface Props {
  testID?: string;
  onPress?: () => void;
}

export const CloseButton: React.FC<Props> = ({ testID = 'CloseButtonID', onPress = undefined }) => {
  const CloseIcon = useSVG('close');

  const pressHandler = useCallback(() => {
    if (onPress) onPress();
  }, []);

  return (
    <CloseButtonPressable
      {...testProperties(testID)}
      hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
      onPress={pressHandler}
    >
      <CloseButtonContainer>
        <CloseIcon />
      </CloseButtonContainer>
    </CloseButtonPressable>
  );
};

export default memo(CloseButton);
