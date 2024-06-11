import React, { memo, useMemo } from 'react';
import { PressableProps } from 'react-native';
import { useRemoteFeaturesSelectorHook } from '@redux/hooks';
import { DefaultTheme } from 'styled-components/native';
import { useCopy } from '@services';
import { useAppAlerts, useGetFeatureStatus as getStatus } from '@hooks';
import { RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';
import { StyledTouchable, TappableText } from './styles';

interface TappableProps extends PressableProps {
  testID?: string;
  title?: string;
  onPress?: () => void;
  onPressType?: 'onPress' | 'onPressIn' | 'onLongPress' | 'onPressOut';
  component?: Element;
  featureFlags?: string[] | (keyof RemoteConfigFeatures)[];
  minHeight?: number;
  titleFontSize?: number;
  style?: any;
  disabledColor?: keyof DefaultTheme['tokens']['colors'];
  [x: string]: unknown;
}

export const Touchable: React.FC<TappableProps> = ({
  children,
  testID = 'TouchableID',
  component = undefined,
  title = undefined,
  onPress = undefined,
  onPressType = 'onPress',
  featureFlags = [],
  minHeight = undefined,
  titleFontSize = undefined,
  style = {},
  disabledColor = undefined,
  ...props
}) => {
  const Tappable = (component || StyledTouchable) as unknown as React.FC<any>;
  const { showFeatureUnavailableToast } = useAppAlerts();
  const remoteConfigFeatures = useRemoteFeaturesSelectorHook();
  const { getCopyValue } = useCopy();

  const getFeatureStatus = (
    featureKey: keyof RemoteConfigFeatures,
  ): [boolean, boolean, boolean] => {
    const status = getStatus(featureKey, remoteConfigFeatures);
    return [status === 'on', status === 'off', status === 'hide'];
  };

  const [on, off, hide] = useMemo(() => {
    let [onR, offR, hideR] = [true, false, false];
    let conditional = 'and';
    (featureFlags || []).forEach((featureFlag: string, index: number): void => {
      const [onT, offT, hideT] = getFeatureStatus(
        featureFlag as keyof RemoteConfigFeatures,
      );
      if (['and', 'or', 'hide'].includes(featureFlag)) {
        conditional = featureFlag;
        return;
      }
      if (index === 0) {
        offR = offT;
        onR = onT;
        hideR = hideT;
      } else {
        if (conditional === 'and') {
          offR = offR && offT;
          onR = !offR;
          hideR = hideR && hideT;
        }
        if (conditional === 'or') {
          offR = offR || offT;
          onR = !offR;
          hideR = hideR || hideT;
        }
        if (conditional === 'hide') {
          hideR = hideT;
        }
      }
    });
    return [onR, offR, hideR];
  }, [featureFlags]);

  const onTap = (): void => {
    let calls = [];
    let proceed = true;
    calls = [checkOn, checkOff];
    calls.forEach((call): void => {
      if (proceed) {
        proceed = call();
      }
    });
  };

  const checkOn = (): boolean => {
    if (on && onPress) {
      onPress();
      return false;
    }
    return true;
  };

  const checkOff = (): boolean => {
    if (off) {
      showFeatureUnavailableToast();
      return false;
    }
    return true;
  };

  if (hide) return undefined;

  return (
    <Tappable
      isGreyed={off}
      testID={testID}
      style={style}
      minHeight={minHeight}
      disabledColor={disabledColor || 'primaryD1'}
      onPress={onPressType === 'onPress' ? onTap : undefined}
      onPressIn={onPressType === 'onPressIn' ? onTap : undefined}
      onPressOut={onPressType === 'onPressOut' ? onTap : undefined}
      onLongPress={onPressType === 'onLongPress' ? onTap : undefined}
      {...props}
    >
      {title && !children && (
        <TappableText
          type="Subtitle1"
          color={props.disabled ? disabledColor : 'primaryD1'}
          titleFontSize={titleFontSize}
        >
          {getCopyValue(title)}
        </TappableText>
      )}
      {children && !title && children}
    </Tappable>
  );
};

export default memo(Touchable);
