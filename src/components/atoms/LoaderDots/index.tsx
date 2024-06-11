import React, { memo, useEffect, useState } from 'react';
import { DefaultTheme } from 'styled-components/native';
import AnimatedDotItem from '@components/atoms/LoaderDots/AnimatedDotItem';
import { LoaderDotsContainer } from './styles';

const SIZE_DOT = 4;
const DOTS = [1, 2, 3];
const INTERVAL_VALUE = 150;
const ANIMATION_TIME = 1000 / DOTS.length;
const ANIMATION_SCALE_VALUE = 1;
const ANIMATION_TRANSLATE_Y_VALUE = -6;

export type DotProps = {
  testID?: string;
  color?: keyof DefaultTheme['tokens']['colors'];
  size?: number;
  length?: number;
  animationDuration?: number;
  animationScale: number;
  animationTranslateY: number;
  active?: boolean;
};

export const LoaderDots = ({
  testID = 'LoaderDotsID',
  color = 'primaryD1',
  size = SIZE_DOT,
  animationDuration = ANIMATION_TIME,
  animationScale = ANIMATION_SCALE_VALUE,
  animationTranslateY = ANIMATION_TRANSLATE_Y_VALUE,
}: DotProps): React.JSX.Element => {
  const [activeDot, setActiveDot] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot(state => (state >= DOTS.length ? 1 : state + 1));
    }, INTERVAL_VALUE);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoaderDotsContainer testID={testID}>
      {DOTS.map(dot => (
        <AnimatedDotItem
          key={`dot-${dot}`}
          color={color}
          size={size}
          animationDuration={animationDuration}
          animationScale={animationScale}
          animationTranslateY={animationTranslateY}
          active={dot === activeDot}
        />
      ))}
    </LoaderDotsContainer>
  );
};

export default memo(LoaderDots);
