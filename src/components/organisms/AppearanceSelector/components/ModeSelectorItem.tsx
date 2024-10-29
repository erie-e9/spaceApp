import React, { memo, useMemo } from 'react';
import { useRemoteFeaturesSelectorHook } from '@redux/hooks';
import { useAppPreferences } from '@hooks';
import { RenderWhen } from '@components/atoms';
import { type RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';
import { type ButtonType } from '@types';
import {
  ModeButton,
  ModeButtonContainer,
  ModeContainer,
  ModeButtonLabel,
  SelectedIndicator,
} from './styles';
import { TitleNameContainer } from '../styles';

export interface ModeSelectorItemProps {
  title?: string;
  icon?: string;
  value: any;
  buttonType?: ButtonType;
  onPress?: () => void;
  remoteConfig?: keyof RemoteConfigFeatures;
}

export const ModeSelectorItem: React.FC<ModeSelectorItemProps> = ({
  title,
  value,
  icon,
  onPress,
  remoteConfig,
}) => {
  const { mode } = useAppPreferences();
  const remoteConfigFeatures = useRemoteFeaturesSelectorHook();
  const remoteConfigStatus = remoteConfig ? remoteConfigFeatures[remoteConfig].status : 'on';

  const selectedItem: boolean = useMemo(() => mode === value, [mode, value]);

  return (
    <RenderWhen isTrue={remoteConfigStatus !== 'hide'}>
      <ModeContainer>
        <ModeButtonContainer>
          <SelectedIndicator>
            <ModeButton
              selected={false}
              onPress={() => {
                if (onPress) onPress();
              }}
              remoteFeatureFlags={remoteConfig ? [remoteConfig] : undefined}
            >
              {icon}
            </ModeButton>
          </SelectedIndicator>
        </ModeButtonContainer>
        {title && (
          <TitleNameContainer selected={selectedItem}>
            <ModeButtonLabel
              type="Label"
              textAlign="center"
              color={selectedItem ? 'tertiary900' : 'tertiary700'}
              weight={selectedItem ? 'semi-bold' : 'normal'}
            >
              {title}
            </ModeButtonLabel>
          </TitleNameContainer>
        )}
      </ModeContainer>
    </RenderWhen>
  );
};

export default memo(ModeSelectorItem);
