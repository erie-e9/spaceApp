import { memo } from 'react';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { useSkeleton } from './hooks/useSkeleton';
import { GradientView, ParentView } from './styles';

export type AnimationDirection = 'leftToRight' | 'rightToLeft' | 'topToBottom' | 'bottomToTop';

export type AnimationType = 'shiver' | 'pulse';

export interface SkeletonProps {
  height: number;
  width: number;
  borderRadius?: number;
  style?: object;
  backgroundColor?: string;
  direction?: AnimationDirection;
  animationType?: AnimationType;
  gradientColors?: string[];
  duration?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  height,
  width,
  borderRadius,
  style = {},
  backgroundColor = '#DDEAF5',
  direction = 'leftToRight',
  animationType = 'pulse',
  gradientColors = [
    'rgba(255,255,255,0)',
    'rgba(255,255,255,0.1)',
    'rgba(255,255,255,0.2)',
    'rgba(255,255,255,0.3)',
    'rgba(255,255,255,0.3)',
    'rgba(255,255,255,0.3)',
    'rgba(255,255,255,0.2)',
    'rgba(255,255,255,0.1)',
    'rgba(255,255,255,0)',
  ],
  duration = 700,
}) => {
  const {
    parentDimensions,
    setParentDimensions,
    animatedStyleParent,
    gradientDimensions,
    setGradientDimensions,
    isXDirectionAnimation,
    animatedStyleX,
    isYDirectionAnimation,
    animatedStyleY,
    coordinates,
  } = useSkeleton({ direction, animationType, duration });

  return (
    <ParentView
      onLayout={(event) => {
        if (parentDimensions.width === -1 && animationType === 'shiver') {
          setParentDimensions({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
          });
        }
      }}
      style={[style, animatedStyleParent]}
      height={height}
      width={width}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
    >
      {animationType === 'shiver' && (
        <GradientView
          onLayout={(event) => {
            if (gradientDimensions.width === -1) {
              setGradientDimensions({
                width: event.nativeEvent.layout.width,
                height: event.nativeEvent.layout.height,
              });
            }
          }}
          style={[
            isXDirectionAnimation && animatedStyleX,
            isYDirectionAnimation && animatedStyleY,
            { width: isXDirectionAnimation ? '80%' : '100%' },
          ]}
        >
          <Canvas style={{ flex: 1 }}>
            <Rect x={0} y={0} width={width} height={height}>
              <LinearGradient start={vec(0, 0)} end={vec(width, 0)} colors={gradientColors} />
            </Rect>
          </Canvas>
        </GradientView>
      )}
    </ParentView>
  );
};

export default memo(Skeleton);
