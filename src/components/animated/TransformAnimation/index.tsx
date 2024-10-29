import React, { memo, useCallback, useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  AnimatedStyle,
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
  trigger?: any;
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
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

export const TransformAnimation: React.FC<Props> = ({
  testID = 'TransformAnimationID',
  trigger = true,
  children,
  duration = 2000,
  initialXValue = 0,
  finalXValue = 1,
  initialYValue = 0,
  finalYValue = 1,
  delay = 0,
  repeat = 1,
  reverse = false,
  easing,
  style,
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

    if (typeof trigger === 'boolean') {
      if (trigger) {
        triggerAnimate();
      } else {
        cleanup();
      }
    } else {
      triggerAnimate();
    }
    return () => {
      cleanup();
    };
  }, [offSetX, offSetY, trigger]);

  return (
    <StyledAnimatedContainer {...testProperties(testID)} style={[style, animatedStyles]}>
      {children}
    </StyledAnimatedContainer>
  );
};

export default memo(TransformAnimation);
