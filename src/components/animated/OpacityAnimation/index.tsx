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

const OpacityAnimation: React.FC<Props> = ({
  trigger = true,
  children,
  duration,
  initialValue,
  finalValue,
  delay,
  repeat = 1,
  reverse = false,
  easing,
}) => {
  const opacity = useSharedValue(initialValue);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value ?? 1,
    };
  }, [opacity.value]);

  const triggerAnimate = useCallback(() => {
    if (trigger && (initialValue || finalValue)) {
      opacity.value = withDelay(
        delay ?? 0,
        withRepeat(
          withTiming(finalValue ?? 0, {
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
    opacity.value,
  ]);

  useEffect(() => {
    const cleanup = () => {
      cancelAnimation(opacity);
      opacity.value = initialValue;
    };

    if (trigger) {
      triggerAnimate();
    } else {
      cleanup();
    }
    return () => {
      cleanup();
    };
  }, [opacity, trigger]);

  return <Animated.View style={[animatedStyles]}>{children}</Animated.View>;
};

export default memo(OpacityAnimation);
