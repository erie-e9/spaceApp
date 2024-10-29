import React, { memo, useCallback } from 'react';
import { OptionSelectorItemProps } from '..';
import { OptionButton, OptionButtonContainer, OptionContainer, OptionButtonLabel } from './styles';
import { useModal } from '@hooks';

interface OptionSelectorItemPropsExtended {}

export const OptionSelectorItem: React.FC<
  OptionSelectorItemProps & OptionSelectorItemPropsExtended
> = ({ title, remoteFeatureFlags, onPress, icon }) => {
  const { hideModal } = useModal();

  const closeBottomSheet = useCallback(() => {
    hideModal();
  }, []);

  return (
    <OptionContainer>
      <OptionButtonContainer>
        <OptionButton
          type="Icon"
          icon={icon}
          buttonTheme="Primary"
          onPressType="onPress"
          onPress={() => {
            if (onPress) onPress();
            closeBottomSheet();
          }}
          remoteFeatureFlags={remoteFeatureFlags}
        />
        {title && <OptionButtonLabel textAlign="center">{title}</OptionButtonLabel>}
      </OptionButtonContainer>
    </OptionContainer>
  );
};

export default memo(OptionSelectorItem);
