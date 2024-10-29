import React, { memo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { ScreenBackgroundProps } from '@types';
import { testProperties } from '@utils/functions';
import { ContentContainer, SkiaCanvas, StyledBackgroundContainer } from './styles';
import {
  add,
  BackdropFilter,
  Blur,
  ColorMatrix,
  Fill,
  Image,
  ImageShader,
  LinearGradient,
  mix,
  Rect,
  sub,
  useImage,
  useVideo,
  vec,
  Video,
} from '@shopify/react-native-skia';
import { useDerivedValue } from 'react-native-reanimated';

const BlurEffect: React.FC<Partial<ScreenBackgroundProps>> = ({
  testID,
  children,
  dimensions,
  style = { ...StyleSheet.absoluteFillObject },
  layerOpacity,
  backgroundType,
  backgroundSource,
  fillColor,
}) => {
  const { width, height } = useWindowDimensions();
  // const progress = useLoop();
  const c = vec(width / 2, (height / 2) * 0.5);
  const r = c.x - 32;
  const start = useDerivedValue(() => sub(c, vec(0, mix(0, r, r))), []);
  const end = useDerivedValue(() => add(c, vec(0, mix(0, r, r / 2))), []);
  const image = useImage(backgroundSource);
  const { currentFrame } = useVideo(
    backgroundType === 'video' && backgroundSource ? backgroundSource : '',
    {
      paused: false,
      looping: true,
      volume: 0,
    },
  );
  const BLACK_AND_WHITE = [1, -2, 0.5, 0, 0, 0, 1, -0.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

  return (
    <StyledBackgroundContainer
      {...testProperties(testID || 'BlurEffectID')}
      style={[style, dimensions]}
    >
      <SkiaCanvas>
        {backgroundSource && (
          <>
            {backgroundType === 'image' ? (
              <Image image={image} x={0} y={0} width={width} height={height} fit="fitHeight" />
            ) : (
              <Fill>
                <ImageShader
                  image={currentFrame}
                  x={0}
                  y={0}
                  width={width}
                  height={height}
                  fit="cover"
                />
              </Fill>
            )}
          </>
        )}
        {/* <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          // c={c} r={r}
        >
          <LinearGradient start={start} end={end} colors={['#2f3637', '#ff0505', '#ae0202']} />
        </Rect> */}
        <BackdropFilter
          clip={{ x: 0, y: 0, width, height }}
          filter={
            <Blur blur={5}>
              <ColorMatrix matrix={BLACK_AND_WHITE} />
            </Blur>
          }
        >
          <Fill
            color={
              `${
                layerOpacity && layerOpacity < 1 && fillColor
                  ? fillColor + layerOpacity * 100
                  : fillColor
              }` || 'rgba(0, 0, 0, 0.5)'
            }
          />
        </BackdropFilter>
      </SkiaCanvas>
      {children}
    </StyledBackgroundContainer>
  );
};

export default memo(BlurEffect);
