import React, { Fragment, memo, ReactElement } from 'react';
import { DefaultTheme } from 'styled-components/native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { useSkeleton } from './hooks/useSkeleton';
import { GradientView, ParentView } from './styles';

export type AnimationDirection = 'leftToRight' | 'rightToLeft' | 'topToBottom' | 'bottomToTop';

export type AnimationType = 'shiver' | 'pulse';

export interface SkeletonProps {
  show?: boolean;
  height: number;
  width: number;
  borderRadius?: number;
  style?: object;
  backgroundColor?: keyof DefaultTheme['tokens']['colors'];
  direction?: AnimationDirection;
  animationType?: AnimationType;
  gradientColors?: string[];
  duration?: number;
  children?: string | ReactElement | ReactElement[];
}

const gradientColorsDefault = [
  'rgba(255,255,255,0)',
  'rgba(255,255,255,0.1)',
  'rgba(255,255,255,0.2)',
  'rgba(255,255,255,0.3)',
  'rgba(255,255,255,0.3)',
  'rgba(255,255,255,0.3)',
  'rgba(255,255,255,0.2)',
  'rgba(255,255,255,0.1)',
  'rgba(255,255,255,0)',
];

const MemoizedGradient = memo(
  ({ width = 30, height = 15, gradientColors = gradientColorsDefault }: Partial<SkeletonProps>) => (
    <Canvas style={{ flex: 1 }}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient start={vec(0, 0)} end={vec(width, 0)} colors={gradientColors} />
      </Rect>
    </Canvas>
  ),
);

export const Skeleton: React.FC<SkeletonProps> = ({
  show = false,
  height,
  width,
  borderRadius,
  style = {},
  backgroundColor = 'tertiary200',
  direction = 'leftToRight',
  animationType = 'pulse',
  gradientColors,
  duration = 700,
  children,
}) => {
  const { animatedStyleParent, handleParentLayout, handleGradientLayout, gradientStyle } =
    useSkeleton({ direction, animationType, duration });

  return (
    <Fragment>
      {show ? (
        <ParentView
          onLayout={handleParentLayout}
          style={[style, animatedStyleParent]}
          height={height}
          width={width}
          borderRadius={borderRadius}
          background={backgroundColor}
        >
          {animationType === 'shiver' && (
            <GradientView onLayout={handleGradientLayout} style={gradientStyle}>
              <MemoizedGradient height={height} width={width} gradientColors={gradientColors} />
            </GradientView>
          )}
        </ParentView>
      ) : (
        <>{children}</>
      )}
    </Fragment>
  );
};

export default memo(Skeleton);
