import React, { memo, useCallback } from 'react';
import { testProperties } from '@utils/functions';
import { SVGIcon } from '@components/atoms';
import { CloseButtonContainer, CloseButtonPressable } from './styles';

interface Props {
  testID?: string;
  onPress?: () => void;
}

export const CloseButton: React.FC<Props> = ({ testID = 'CloseButtonID', onPress = undefined }) => {
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
        <SVGIcon icon="close" />
      </CloseButtonContainer>
    </CloseButtonPressable>
  );
};

export default memo(CloseButton);
