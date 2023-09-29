import React, { useCallback, useEffect, useState } from 'react';
import { DefaultTheme } from 'styled-components/native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedDot, LoaderThreeDotsContainer } from './styles';

const sizeDot = 4;
const dots = [1, 2, 3];
const intervalValue = 150;
const animationTime = 1000 / dots.length;
const animationScaleValue = 1;
const animationTranslateYValue = -6;

type DotProps = {
  color?: keyof DefaultTheme['tokens']['colors'];
  size?: number;
  animationDuration?: number;
  animationScale?: number;
  animationTranslateY?: number;
  active?: boolean;
} & typeof defaultProps;

const defaultProps = {
  color: 'primaryD1',
  size: sizeDot,
  animationDuration: animationTime,
  animationScale: animationScaleValue,
  animationTranslateY: animationTranslateYValue,
  active: false,
};

const Dot = ({
  color,
  size = sizeDot,
  animationDuration = animationTime,
  animationScale = animationScaleValue,
  animationTranslateY = animationTranslateYValue,
  active = false,
}: DotProps): JSX.Element => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
    };
  });
  const scaleDown = useCallback(() => {
    scale.value = withTiming(1, {
      duration: animationDuration,
    });
  }, [animationDuration, scale]);

  const scaleUp = useCallback(() => {
    scale.value = withTiming(animationScale, {
      duration: animationDuration,
    });
  }, [animationDuration, animationScale, scale]);

  const scaleYDown = useCallback(() => {
    translateY.value = withTiming(1, {
      duration: animationDuration,
    });
  }, [animationDuration, translateY]);

  const scaleYUp = useCallback(() => {
    translateY.value = withTiming(animationTranslateY, {
      duration: animationDuration,
    });
  }, [animationDuration, animationTranslateY, translateY]);

  useEffect(() => {
    if (!active) {
      scaleDown();
      scaleYDown();
    }
    if (active) {
      scaleUp();
      scaleYUp();
    }
  }, [active, scaleDown, scaleUp]);

  return <AnimatedDot style={[animatedStyles]} size={size} color={color}/>;
};
Dot.defaultProps = defaultProps;

const LoaderThreeDots = (props: DotProps): JSX.Element => {
  const [active, setActive] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(state => (state > dots.length - 1 ? 1 : state + 1));
    }, intervalValue);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <LoaderThreeDotsContainer>
      {dots.map(i => (
        <Dot key={`dot-${i}`} {...props} active={i === active} />
      ))}
    </LoaderThreeDotsContainer>
  );
};
LoaderThreeDots.defaultProps = defaultProps;

export default LoaderThreeDots;
