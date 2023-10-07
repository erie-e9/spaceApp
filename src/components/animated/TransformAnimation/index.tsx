/* eslint-disable react/require-default-props */
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
import { StyledAnimatedContainer } from './styles';

interface Props {
  testID?: string;
  trigger?: boolean;
  children?: string | React.ReactElement | React.ReactElement[];
  duration?: number;
  initialXValue?: number;
  finalXValue?: number;
  initialYValue?: number;
  finalYValue?: number;
  delay?: number;
  repeat?: number;
  reverse?: boolean;
  easing?: typeof Easing | string | unknown;
}

export const TransformAnimation: React.FC<Props> = ({
  testID,
  trigger = true,
  children,
  duration,
  initialXValue,
  finalXValue = 1,
  initialYValue,
  finalYValue = 1,
  delay,
  repeat,
  reverse = false,
  easing,
}) => {
  const offSetX = useSharedValue(initialXValue);
  const offSetY = useSharedValue(initialYValue);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offSetX.value ?? 1 * finalXValue ?? 1 },
        { translateY: offSetY.value ?? 1 * finalYValue ?? 1 },
      ],
    };
  }, [offSetX.value, offSetY.value]);

  const triggerAnimate = useCallback(() => {
    if ((trigger && initialXValue) || initialXValue === 0) {
      offSetX.value = withDelay(
        delay ?? 0,
        withRepeat(
          withTiming(finalXValue ?? 1, {
            duration: duration ?? 2000,
          }),
          repeat ?? 1,
          reverse ?? false,
        ),
      );
    }

    if ((trigger && initialYValue) || initialYValue === 0) {
      offSetY.value = withDelay(
        delay ?? 0,
        withRepeat(
          withTiming(finalYValue ?? 1, {
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
    initialXValue,
    finalXValue,
    initialYValue,
    finalYValue,
    delay,
    repeat,
    reverse,
    offSetX.value,
    offSetY.value,
  ]);

  useEffect(() => {
    const cleanup = () => {
      cancelAnimation(offSetX);
      cancelAnimation(offSetY);
      offSetX.value = initialXValue || 0;
      offSetY.value = initialYValue || 0;
    };

    if (trigger) {
      triggerAnimate();
    } else {
      cleanup();
    }
    return () => {
      cleanup();
    };
  }, [offSetX, offSetY, trigger]);

  return (
    <StyledAnimatedContainer testID={testID} style={[animatedStyles]}>
      {children}
    </StyledAnimatedContainer>
  );
};

TransformAnimation.defaultProps = {
  testID: 'TransformAnimationID',
  trigger: true,
  duration: 2000,
  initialXValue: 0,
  finalXValue: 1,
  initialYValue: 0,
  finalYValue: 1,
  delay: 0,
  repeat: 1,
  reverse: false,
  easing: 'linear',
};

export default memo(TransformAnimation);
