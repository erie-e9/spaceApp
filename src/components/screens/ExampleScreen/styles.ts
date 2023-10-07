import { PixelRatio } from 'react-native';
import styled from 'styled-components/native';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { ActionButton, Typography } from '@components/atoms';

export const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})``;

export const HeaderContainer = styled.View`
  flex: 1;
  flex-grow: 1;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const BodyContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;
  padding: ${getNormalizedVerticalSize(0)}px
    ${getNormalizedHorizontalSize(20)}px;
`;

export const BrandCircleContainer = styled.View<{
  darkMode: boolean;
}>`
  position: absolute;
  height: ${PixelRatio.roundToNearestPixel(250)}px;
  width: ${PixelRatio.roundToNearestPixel(250)}px;
  background-color: ${({ darkMode }) => (darkMode ? '#000000' : '#DFDFDF')};
  border-radius: ${PixelRatio.roundToNearestPixel(140)}px;
`;

export const ContentContainer = styled.View``;

export const TitleContainer = styled.View`
  margin: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const DescriptionContainer = styled.View`
  margin: ${getNormalizedVerticalSize(15)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const StyledTypography = styled(Typography)<{
  underline?: boolean;
}>`
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

export const FeaturesContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-bottom: ${getNormalizedVerticalSize(2)}px;
`;

export const FeatureButton = styled(ActionButton)``;

export const FeatureIcon = styled.Image`
  tint-color: ${({ theme }) => theme.tokens.colors.opposing};
`;

export const BrandDecorItem1 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  bottom: ${getNormalizedVerticalSize(-200)}px;
  right: ${getNormalizedHorizontalSize(100)}px;
  height: ${getNormalizedVerticalSize(100)}px;
  width: ${getNormalizedHorizontalSize(100)}px;
  tint-color: ${({ theme }) => theme.tokens.colors.tertiaryL5};
  z-index: 0;
`;

export const BrandDecorItem2 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  bottom: ${getNormalizedVerticalSize(-200)}px;
  right: ${getNormalizedHorizontalSize(90)}px;
  tint-color: ${({ theme }) => theme.tokens.colors.secondaryD1};
  z-index: 0;
`;

export const BrandDecorItem3 = styled.View`
  height: ${getNormalizedVerticalSize(300)}px;
  width: ${getNormalizedHorizontalSize(300)}px;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export const Brand = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: ${getNormalizedVerticalSize(220)}px;
  width: ${getNormalizedHorizontalSize(220)}px;
`;

export const BrandDecorItem4 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: ${getNormalizedVerticalSize(180)}px;
  width: ${getNormalizedHorizontalSize(180)}px;
  position: absolute;
  right: ${getNormalizedHorizontalSize(60)}px;
  bottom: ${getNormalizedVerticalSize(0)}px;
  z-index: 0;
  tint-color: ${({ theme }) => theme.tokens.colors.opposing};
`;

export const BrandDecorItem5 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  bottom: -5%;
  left: ${getNormalizedHorizontalSize(-100)}px;
  tint-color: ${({ theme }) => theme.tokens.colors.secondaryL1};
`;

export const BrandDecorItem6 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  bottom: 15%;
  left: ${getNormalizedHorizontalSize(100)}px;
  tint-color: ${({ theme }) => theme.tokens.colors.buttonColor};
`;

export const BrandDecorItem7 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  top: -10%;
  left: ${getNormalizedHorizontalSize(0)}px;
  tint-color: ${({ theme }) => theme.tokens.colors.secondaryD1};
`;

export const BrandDecorItem8 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: ${getNormalizedVerticalSize(140)}px;
  width: ${getNormalizedHorizontalSize(140)}px;
  position: absolute;
  bottom: ${getNormalizedVerticalSize(-220)}px;
  left: ${getNormalizedHorizontalSize(-10)}px;
  tint-color: ${({ theme }) => theme.tokens.colors.tertiaryL5};
`;

export const BrandDecorItem9 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  top: 100%;
  left: ${getNormalizedHorizontalSize(0)}px;
  tint-color: ${({ theme }) => theme.tokens.colors.secondaryL1};
  transform: rotate(30deg);
`;
