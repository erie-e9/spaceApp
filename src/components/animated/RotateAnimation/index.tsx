/* eslint-disable react/require-default-props */
import React, { memo, useCallback, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

interface Props {
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

const RotateAnimation: React.FC<Props> = ({
  trigger = true,
  children,
  duration,
  initialValue,
  finalValue = 1,
  delay,
  repeat,
  reverse = false,
  easing,
}) => {
  const rotate = useSharedValue(initialValue);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  }, [rotate.value]);

  const triggerAnimate = useCallback(() => {
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
  }, [
    trigger,
    duration,
    initialValue,
    finalValue,
    delay,
    repeat,
    reverse,
    rotate,
  ]);

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

  return <Animated.View style={[animatedStyles]}>{children}</Animated.View>;
};

export default memo(RotateAnimation);
