import { Dimensions, PixelRatio, Platform } from 'react-native';

const fontScale = PixelRatio.getFontScale();
export const responsiveFontSize = (size: number) => size / fontScale;

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
export { SCREEN_HEIGHT, SCREEN_WIDTH };
const scaleVertical = SCREEN_HEIGHT / 812;
const scale = SCREEN_WIDTH / 375;

export const getNormalizedVerticalSize = (size: number) => {
  const newSize = size * scaleVertical;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
};

export const getNormalizedHorizontalSize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};
