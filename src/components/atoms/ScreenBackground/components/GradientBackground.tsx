import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import {
  ColorMatrix,
  Fill,
  Image,
  ImageShader,
  LinearGradient,
  Rect,
  useImage,
  useVideo,
  vec,
} from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { testProperties, getRandonColorRGB } from '@utils/functions';
import { ScreenBackgroundProps } from '@types';
import { ContentContainer, SkiaCanvas, StyledBackgroundContainer } from './styles';
import { useTheme } from '@hooks';

const GradientBackground: React.FC<Partial<ScreenBackgroundProps>> = ({
  testID,
  children,
  //   colors = ['#441285', '#7b506b', '#52484a', '#1d1b1b'],
  colors = ['#7010ee', '#e090c1', '#f8cbd3', '#feebef'],
  //   colors = ['#7010ee', '#e090c1', '#f8cbd3'],
  // colors = ['#181725', '#181725', '#181725', '#181725'],
  //   direction = 'vertical',
  dimensions,
  style = { ...StyleSheet.absoluteFillObject },
  layerOpacity,
  backgroundType,
  backgroundSource,
  canvasDimensions,
}) => {
  const { currentFrame } = useVideo(
    backgroundType === 'video' && backgroundSource ? backgroundSource : '',
    {
      paused: false,
      looping: true,
      volume: 0,
    },
  );

  const image = useImage(backgroundType === 'image' && backgroundSource ? backgroundSource : '');
  const width = canvasDimensions?.width || 200;
  const height = canvasDimensions?.height || 200;
  const topColor = useSharedValue('#e9b6ff');
  const top2Color = useSharedValue('#a0f5ff');
  const bottomColor = useSharedValue('#7de9f5');
  const bottom2Color = useSharedValue('#57c3cf');
  const { Images } = useTheme();

  //   const colors = useDerivedValue(() => {
  //     return [topColor.value, top2Color.value, bottomColor.value, bottom2Color.value];
  //   }, [topColor.value, top2Color.value, bottomColor.value, bottom2Color.value]);

  //   { "leftColor": "#2b3aeb", "rightColor": "#fa7abd" }
  //   { "leftColor": "#e9b6ff", "rightColor": "#7de9f5" }

  //   colors = ['#8323ff', '#e090c1', '#f8cbd3', '#feebef'],
  //   colors = ['#8323ff', '#e090c1', '#f8cbd3'],

  //   useEffect(() => {
  //     console.log('ewe', { topColor: topColor, bottomColor: bottomColor });
  //     const t = setInterval(() => {
  //       topColor.value = getRandonColorRGB();
  //       top2Color.value = getRandonColorRGB();
  //       bottomColor.value = getRandonColorRGB();
  //       bottom2Color.value = getRandonColorRGB();
  //     }, 5000);

  //     return () => {
  //       clearInterval(t);
  //     };
  //   }, []);

  return (
    <StyledBackgroundContainer
      {...testProperties(testID || 'GradientBackgroundID')}
      style={[style, dimensions]}
    >
      <SkiaCanvas>
        {backgroundSource && (
          <>
            {backgroundType === 'image' ? (
              <Image image={image} x={0} y={0} width={width} height={height + 25} fit="fitHeight" />
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

        <Rect x={0} y={0} width={width} height={height + 25} opacity={layerOpacity || 0.9}>
          <LinearGradient start={vec(340, 200)} end={vec(width, height)} colors={colors} />
        </Rect>
      </SkiaCanvas>
      <ContentContainer>{children}</ContentContainer>
    </StyledBackgroundContainer>
  );
};

export default memo(GradientBackground);
