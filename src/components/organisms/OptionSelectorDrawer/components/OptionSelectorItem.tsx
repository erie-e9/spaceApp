import React, { memo, useCallback } from 'react';
import { useModal } from '@hooks';
import { OptionSelectorItemProps } from '..';
import { OptionButton, OptionButtonContainer, OptionContainer, OptionButtonLabel } from './styles';

interface OptionSelectorItemPropsExtended {}

export const OptionSelectorItem: React.FC<
  OptionSelectorItemProps & OptionSelectorItemPropsExtended
> = ({ title, remoteFeatureFlags, onPress, icon }) => {
  const { hideModal } = useModal();

  const closeBottomSheet = useCallback(() => {
    hideModal();
  }, [hideModal]);

  const onPressHandler = useCallback(() => {
    onPress?.();
    closeBottomSheet();
  }, [closeBottomSheet, onPress]);

  return (
    <OptionContainer>
      <OptionButtonContainer>
        <OptionButton
          type="Icon"
          icon={icon}
          buttonTheme="Primary"
          onPressType="onPress"
          onPress={onPressHandler}
          remoteFeatureFlags={remoteFeatureFlags}
        />
        {title && <OptionButtonLabel textAlign="center">{title}</OptionButtonLabel>}
      </OptionButtonContainer>
    </OptionContainer>
  );
};

export default memo(OptionSelectorItem);
