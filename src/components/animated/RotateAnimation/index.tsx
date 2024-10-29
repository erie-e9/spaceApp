import React, { memo, useCallback, useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { testProperties } from '@utils/functions';
import { StyledAnimatedContainer } from './styles';

interface Props {
  testID?: string;
  trigger?: boolean;
  children?: string | React.ReactElement | React.ReactElement[];
  duration?: number;
  initialValue?: number;
  finalValue?: number;
  delay?: number;
  repeat?: number;
  reverse?: boolean;
  easing?: typeof Easing | string | unknown;
}

export const RotateAnimation: React.FC<Props> = ({
  testID = 'RotateAnimationID',
  trigger = true,
  children = undefined,
  duration = 2000,
  initialValue = 0,
  finalValue = 1,
  delay = 0,
  repeat = 1,
  reverse = false,
  easing = 'linear',
}) => {
  const rotate = useSharedValue(initialValue);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  }, [rotate.value]);

  const triggerAnimate = useCallback((): void => {
    if ((trigger && initialValue) || initialValue === 0) {
      rotate.value = withDelay(
        delay ?? 0,
        withRepeat(
          withTiming(finalValue ?? 1, {
            duration: duration ?? 2000,
            easing: easing ? Easing[easing] : Easing.inOut(Easing.quad),
          }),
          repeat ?? 1,
          reverse ?? false,
        ),
      );
    }
  }, [trigger, duration, initialValue, finalValue, delay, repeat, reverse, rotate]);

  useEffect(() => {
    const cleanup = () => {
      cancelAnimation(rotate);
      rotate.value = initialValue || 0;
    };

    if (trigger) {
      triggerAnimate();
    } else {
      cleanup();
    }
    return () => {
      cleanup();
    };
  }, [rotate, trigger]);

  return (
    <StyledAnimatedContainer {...testProperties(testID)} style={[animatedStyles]}>
      {children && children}
    </StyledAnimatedContainer>
  );
};

export default memo(RotateAnimation);
