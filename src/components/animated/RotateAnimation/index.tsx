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
  initialRotateValue?: number;
  finalRotateValue?: number;
  delay?: number;
  repeat?: number;
  reverse?: boolean;
}

const RotateAnimation: React.FC<Props> = ({
  trigger = true,
  children,
  duration,
  initialRotateValue,
  finalRotateValue = 1,
  delay,
  repeat,
  reverse = false,
}) => {
  const rotate = useSharedValue(initialRotateValue);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  }, [rotate.value]);

  const triggerAnimate = useCallback(() => {
    if ((trigger && initialRotateValue) || initialRotateValue === 0) {
      rotate.value = withDelay(
        delay ?? 0,
        withRepeat(
          withTiming(finalRotateValue ?? 1, {
            duration: duration ?? 2000,
          }),
          repeat ?? 1,
          reverse ?? false,
        ),
      );
    }
  }, [
    trigger,
    duration,
    initialRotateValue,
    finalRotateValue,
    delay,
    repeat,
    reverse,
    rotate,
  ]);

  useEffect(() => {
    const cleanup = () => {
      cancelAnimation(rotate);
      rotate.value = initialRotateValue || 0;
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
