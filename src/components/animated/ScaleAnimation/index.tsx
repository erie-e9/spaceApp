import React, { memo, useEffect, useCallback } from 'react';
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
  children?: React.ReactNode;
  duration?: number;
  initialValue?: number;
  finalValue?: number;
  widthValue?: number;
  heightValue?: number;
  delay?: number;
  repeat?: number;
  reverse?: boolean;
  easing?: keyof typeof Easing;
}

export const ScaleAnimation: React.FC<Props> = ({
  testID = 'ScaleAnimationID',
  trigger = true,
  children,
  duration = 2000,
  initialValue = 0,
  finalValue = 1,
  widthValue,
  heightValue,
  delay = 0,
  repeat = 1,
  reverse = false,
  easing = 'linear',
}) => {
  const scaleValue = useSharedValue(initialValue);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
    width: widthValue ?? undefined,
    height: heightValue ?? undefined,
  }));

  const triggerAnimation = useCallback(() => {
    const timingConfig = {
      duration,
      easing: Easing[easing] || Easing.linear,
    };

    scaleValue.value = withDelay(
      delay,
      withRepeat(withTiming(finalValue, timingConfig), repeat, reverse),
    );
  }, [duration, delay, finalValue, repeat, reverse, easing, scaleValue]);

  useEffect(() => {
    if (trigger) {
      triggerAnimation();
    } else {
      cancelAnimation(scaleValue);
      scaleValue.value = initialValue;
    }

    return () => {
      cancelAnimation(scaleValue);
      scaleValue.value = initialValue;
    };
  }, [trigger, triggerAnimation, initialValue, scaleValue]);

  return (
    <StyledAnimatedContainer testID={testID} style={animatedStyle}>
      {children}
    </StyledAnimatedContainer>
  );
};

export default memo(ScaleAnimation);
