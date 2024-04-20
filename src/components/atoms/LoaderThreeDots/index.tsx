import React, { memo, useEffect, useState } from 'react';
import { DefaultTheme } from 'styled-components/native';
import AnimatedDotItem from '@components/atoms/LoaderThreeDots/AnimatedDotItem';
import { LoaderThreeDotsContainer } from './styles';

const sizeDot = 4;
const dots = [1, 2, 3];
const intervalValue = 150;
const animationTime = 1000 / dots.length;
const animationScaleValue = 1;
const animationTranslateYValue = -6;

export type DotProps = {
  testID?: string;
  color?: keyof DefaultTheme['tokens']['colors'];
  size?: number;
  animationDuration?: number;
  animationScale?: number;
  animationTranslateY?: number;
  active?: boolean;
} & typeof defaultProps;

export const defaultProps = {
  testID: 'LoaderThreeDotsID',
  color: 'primaryD1',
  size: sizeDot,
  animationDuration: animationTime,
  animationScale: animationScaleValue,
  animationTranslateY: animationTranslateYValue,
  active: false,
};

export const LoaderThreeDots = (props: DotProps): React.JSX.Element => {
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
    <LoaderThreeDotsContainer testID={props.testID}>
      {dots.map(i => (
        <AnimatedDotItem key={`dot-${i}`} {...props} active={i === active} />
      ))}
    </LoaderThreeDotsContainer>
  );
};
LoaderThreeDots.defaultProps = defaultProps;

export default memo(LoaderThreeDots);
