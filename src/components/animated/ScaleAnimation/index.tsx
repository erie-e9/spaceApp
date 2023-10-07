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
  initialSizeValue?: number;
  finalSizeValue?: number;
  widthValue?: number;
  heightValue?: number;
  delay?: number;
  repeat?: number;
  reverse?: boolean;
}

const ScaleAnimation: React.FC<Props> = ({
  trigger = true,
  children,
  duration,
  initialSizeValue,
  finalSizeValue,
  widthValue,
  heightValue,
  delay,
  repeat,
  reverse = false,
}) => {
  const offSetScaleValue = useSharedValue(initialSizeValue || 0);
  const offSetWidthValue = useSharedValue(widthValue || 0);
  const offSetHeightValue = useSharedValue(heightValue || 0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform:
        widthValue && heightValue ? [] : [{ scale: offSetScaleValue.value }],
      width: initialSizeValue && finalSizeValue ? 0 : offSetWidthValue.value,
      height: initialSizeValue && finalSizeValue ? 0 : offSetHeightValue.value,
    };
  }, [offSetScaleValue.value, offSetWidthValue.value, offSetHeightValue.value]);

  const triggerAnimate = useCallback(() => {
    if ((trigger && initialSizeValue) || initialSizeValue === 0) {
      offSetScaleValue.value = withDelay(
        delay ?? 0,
        withRepeat(
          withTiming(finalSizeValue ?? 1, {
            duration: duration ?? 2000,
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
          withTiming(finalSizeValue ?? 1, {
            duration: duration ?? 2000,
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
          withTiming(finalSizeValue ?? 1, {
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
    initialSizeValue,
    finalSizeValue,
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
      offSetScaleValue.value = initialSizeValue || 0;
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
