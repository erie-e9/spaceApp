import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRemoteFeaturesSelectorHook } from '@redux/hooks';
import { useCopy } from '@services';
import { hideModal } from '@slices/shared/modal';
import { RenderWhen, SVGIcon } from '@components/atoms';
import { OptionSelectorItemProps } from '..';
import {
  OptionButton,
  OptionButtonContainer,
  OptionContainer,
  OptionButtonLabel,
} from './styles';

interface OptionSelectorItemPropsExtended {}

export const OptionSelectorItem: React.FC<
  OptionSelectorItemProps & OptionSelectorItemPropsExtended
> = ({ title, remoteConfig, onPress, icon }) => {
  const remoteConfigFeatures = useRemoteFeaturesSelectorHook();
  const remoteConfigStatus = remoteConfig
    ? remoteConfigFeatures[remoteConfig].status
    : 'on';

  const dispatch = useDispatch();
  const { getCopyValue } = useCopy();

  const closeBottomSheet = useCallback(() => {
    dispatch(hideModal());
  }, []);

  return (
    <RenderWhen isTrue={remoteConfigStatus !== 'hide'}>
      <OptionContainer>
        <OptionButtonContainer>
          <OptionButton
            type="Icon"
            buttonTheme="Primary"
            onPressType="onPress"
            onPress={() => {
              if (onPress) onPress();
              closeBottomSheet();
            }}
            Icon={<SVGIcon icon={icon || ''} />}
            featureFlags={remoteConfig ? [remoteConfig] : undefined}
          />
          {title && (
            <OptionButtonLabel
              textAlign="center"
              disabled={remoteConfigStatus === 'off'}
            >
              {getCopyValue(title)}
            </OptionButtonLabel>
          )}
        </OptionButtonContainer>
      </OptionContainer>
    </RenderWhen>
  );
};

OptionSelectorItem.defaultProps = {};

export default memo(OptionSelectorItem);
