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
  widthValue?: number;
  heightValue?: number;
  delay?: number;
  repeat?: number;
  reverse?: boolean;
  easing?: typeof Easing | string | unknown;
}

const ScaleAnimation: React.FC<Props> = ({
  trigger = true,
  children,
  duration,
  initialValue,
  finalValue,
  widthValue,
  heightValue,
  delay,
  repeat,
  reverse = false,
  easing,
}) => {
  const offSetScaleValue = useSharedValue(initialValue || 0);
  const offSetWidthValue = useSharedValue(widthValue || 0);
  const offSetHeightValue = useSharedValue(heightValue || 0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform:
        widthValue && heightValue ? [] : [{ scale: offSetScaleValue.value }],
      width: initialValue && finalValue ? 0 : offSetWidthValue.value,
      height: initialValue && finalValue ? 0 : offSetHeightValue.value,
    };
  }, [offSetScaleValue.value, offSetWidthValue.value, offSetHeightValue.value]);

  const triggerAnimate = useCallback(() => {
    if ((trigger && initialValue) || initialValue === 0) {
      offSetScaleValue.value = withDelay(
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
    if (offSetWidthValue && widthValue) {
      offSetWidthValue.value = withDelay(
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
    if (offSetHeightValue && widthValue) {
      offSetHeightValue.value = withDelay(
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
    offSetScaleValue.value,
    offSetWidthValue.value,
    offSetHeightValue.value,
  ]);

  useEffect(() => {
    const cleanup = () => {
      cancelAnimation(offSetScaleValue);
      cancelAnimation(offSetWidthValue);
      cancelAnimation(offSetHeightValue);
      offSetScaleValue.value = initialValue || 0;
      offSetWidthValue.value = widthValue || 0;
      offSetHeightValue.value = heightValue || 0;
    };
    if (trigger) {
      triggerAnimate();
    } else {
      cleanup();
    }
    return () => {
      cleanup();
    };
  }, [offSetScaleValue, offSetWidthValue, offSetHeightValue, trigger]);

  return <Animated.View style={[animatedStyles]}>{children}</Animated.View>;
};

export default memo(ScaleAnimation);
