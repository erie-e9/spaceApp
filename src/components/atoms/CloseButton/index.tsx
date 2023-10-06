import React, { memo } from 'react';
import { useSVG } from '@hooks';
import { Tappable } from '@components/atoms';

interface Props {
  testID?: string;
  onPress?: () => void;
}

export const CloseButton: React.FC<Props> = ({ testID, onPress }) => {
  const CloseButtonIcon = useSVG('CloseButton');

  return (
    <Tappable testID={testID} onPress={onPress}>
      <CloseButtonIcon />
    </Tappable>
  );
};

CloseButton.defaultProps = {
  testID: 'closeModalIcon',
  onPress: undefined,
};

export default memo(CloseButton);
