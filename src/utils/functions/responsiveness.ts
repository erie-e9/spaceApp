import { Dimensions, PixelRatio, Platform } from 'react-native';

const fontScale = PixelRatio.getFontScale();
export const responsiveFontSize = (size: number) => size / fontScale;

export const { height: screen_height, width: screen_width } = Dimensions.get('screen');
const scaleVertical = screen_height / 812;
const scale = screen_width / 375;

export const getNormalizedVerticalSize = (size: number): number => {
  const newSize = size * scaleVertical;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
};

export const getNormalizedHorizontalSize = (size: number): number => {
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

export const getNumericValue = (value: string | number, dimension: 'width' | 'height'): number => {
  const baseSize = dimension === 'width' ? screen_width : screen_height;
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string' && value.endsWith('%')) {
    const percentage = parseFloat(value);
    return (percentage / 100) * baseSize;
  }
  return baseSize;
};
