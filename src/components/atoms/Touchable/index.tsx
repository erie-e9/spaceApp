import React, { memo, useMemo } from 'react';
import { useRemoteFeaturesSelectorHook } from '@redux/hooks';
import { testProperties } from '@utils/functions';
import { type RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';
import { type TouchableProps } from '@types';
import { useAppAlerts, useGetFeatureStatus as getStatus } from '@hooks';
import { StyledTouchable, TappableText } from './styles';

export const Touchable: React.FC<TouchableProps> = ({
  children,
  testID = 'TouchableID',
  component = undefined,
  title = undefined,
  onPress = undefined,
  onPressType = 'onPress',
  remoteFeatureFlags = [],
  minHeight = undefined,
  titleFontSize = undefined,
  style = {},
  disabledColor = undefined,
  accessibilityRole,
  disabled,
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
    (remoteFeatureFlags || []).forEach((featureFlag: string, index: number): void => {
      const [onT, offT, hideT] = getFeatureStatus(featureFlag as keyof RemoteConfigFeatures);
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
  }, [remoteFeatureFlags]);

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
      disabledButton={off || disabled}
      {...testProperties(testID || 'animatedButton')}
      style={style}
      minHeight={minHeight}
      accessible={true}
      accessibilityLabel={title}
      accessibilityRole={accessibilityRole || 'button'}
      disabledColor={disabledColor || 'primary200'}
      onPress={onPressType === 'onPress' ? onTap : undefined}
      onPressIn={onPressType === 'onPressIn' ? onTap : undefined}
      onPressOut={onPressType === 'onPressOut' ? onTap : undefined}
      onLongPress={onPressType === 'onLongPress' ? onTap : undefined}
      {...props}
    >
      {title && !children && (
        <TappableText
          type="Subtitle2"
          color={props.disabled ? disabledColor : 'primary500'}
          titleFontSize={titleFontSize}
          remoteFeatureFlags={remoteFeatureFlags}
        >
          {'title'}
        </TappableText>
      )}
      {children && !title && children}
    </Tappable>
  );
};

export default memo(Touchable);
