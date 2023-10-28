import React, { memo, useMemo } from 'react';
import { PressableProps } from 'react-native';
import { useRemoteFeaturesSelectorHook } from '@redux/hooks';
import { useAppAlerts, useGetFeatureStatus as getStatus } from '@hooks';
import { RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';
import { StyledTouchable } from './styles';

interface TappableProps extends PressableProps {
  testID?: string;
  component?: Element;
  onPress?: () => void;
  onPressType?: 'onPress' | 'onPressIn' | 'onLongPress' | 'onPressOut';
  style?: any;
  [x: string]: unknown;
  featureFlags?: string[] | (keyof RemoteConfigFeatures)[];
}

export const Touchable: React.FC<TappableProps> = ({
  testID,
  children,
  style,
  onPress,
  onPressType,
  component,
  featureFlags,
  ...props
}) => {
  const Tappable = (component || StyledTouchable) as unknown as React.FC<any>;
  const { showFeatureUnavailableToast } = useAppAlerts();
  const remoteConfigFeatures = useRemoteFeaturesSelectorHook();

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
      style={style[0]}
      onPress={onPressType === 'onPress' ? onTap : undefined}
      onPressIn={onPressType === 'onPressIn' ? onTap : undefined}
      onPressOut={onPressType === 'onPressOut' ? onTap : undefined}
      onLongPress={onPressType === 'onLongPress' ? onTap : undefined}
      {...props}
    >
      {children}
    </Tappable>
  );
};

Touchable.defaultProps = {
  testID: 'TouchableID',
  component: undefined,
  onPress: undefined,
  onPressType: 'onPress',
  featureFlags: [],
  style: {},
};

export default memo(Touchable);
