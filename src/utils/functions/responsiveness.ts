import { Dimensions, PixelRatio, Platform } from 'react-native';

const fontScale = PixelRatio.getFontScale();
export const responsiveFontSize = (size: number) => size / fontScale;

const { height: screen_height, width: screen_width } = Dimensions.get('screen');
export { screen_height, screen_width };
const scaleVertical = screen_height / 812;
const scale = screen_width / 375;

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

export const screen = {
  height: Dimensions.get('screen').height,
  width: Dimensions.get('screen').width,
};

export const window = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};
