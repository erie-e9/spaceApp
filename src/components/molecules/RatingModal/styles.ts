import { PixelRatio } from 'react-native';
import styled from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize, screen_width } from '@utils/functions';
import { Typography } from '@components/atoms';
import { ActionButton, TextInput } from '@components/molecules';

export const HeaderContainer = styled.View`
  align-items: center;
  padding: ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(5)}px
    ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(5)}px;
`;

export const RatingTitle = styled(Typography)`
  padding-bottom: ${PixelRatio.roundToNearestPixel(5)}px;
  text-align: center;
`;

export const RatingDescription = styled(Typography)`
  padding-bottom: ${PixelRatio.roundToNearestPixel(10)}px;
  text-align: center;
`;

export const ContentWrapper = styled.View`
  width: ${screen_width - 50}px;
`;

export const StyledInput = styled(TextInput)`
`;

export const ActionSubmitButton = styled(ActionButton)``;

export const ActionSkipButton = styled(ActionButton)`
  margin-top: ${PixelRatio.roundToNearestPixel(10)}px;
`;

export const RatingBarContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: ${PixelRatio.roundToNearestPixel(20)}px
    ${PixelRatio.roundToNearestPixel(10)}px
    ${PixelRatio.roundToNearestPixel(30)}px
    ${PixelRatio.roundToNearestPixel(10)}px;
`;

export const RatingButton = styled.TouchableOpacity`
  margin-horizontal: ${PixelRatio.roundToNearestPixel(10)}px;
`;
