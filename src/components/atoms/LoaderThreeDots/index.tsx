import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated } from 'react-native';
import { AnimatedDot, LoaderThreeDotsContainer } from './styles';

const sizeDot = 4;
const dots = [1, 2, 3];
const intervalValue = 150;
const animationTime = 1000 / dots.length;
const animationScaleValue = 1;
const animationTranslateYValue = -6;

type DotProps = {
  size?: number;
  animationDuration?: number;
  animationScale?: number;
  animationTranslateY?: number;
  active?: boolean;
} & typeof defaultProps;

const defaultProps = {
  size: sizeDot,
  animationDuration: animationTime,
  animationScale: animationScaleValue,
  animationTranslateY: animationTranslateYValue,
  active: false,
};

const Dot = ({
  size = sizeDot,
  animationDuration = animationTime,
  animationScale = animationScaleValue,
  animationTranslateY = animationTranslateYValue,
  active = false,
}: DotProps): JSX.Element => {
  const scale = useMemo(() => new Animated.Value(1), []);
  const translateY = useMemo(() => new Animated.Value(1), []);

  const scaleDown = useCallback(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  }, [animationDuration, scale]);

  const scaleUp = useCallback(() => {
    Animated.timing(scale, {
      toValue: animationScale,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  }, [animationDuration, animationScale, scale]);

  const scaleYDown = useCallback(() => {
    Animated.timing(translateY, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  }, [animationDuration, translateY]);

  const scaleYUp = useCallback(() => {
    Animated.timing(translateY, {
      toValue: animationTranslateY,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
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

  return (
    <AnimatedDot
      style={[{ transform: [{ scale }, { translateY }] }]}
      size={size}
    />
  );
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
