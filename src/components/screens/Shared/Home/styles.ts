import { PixelRatio } from 'react-native';
import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { InterpolateColorAnimation } from '@components/animated';
import { Typography } from '@components/atoms';
import { ActionButton } from '@components/molecules';

export const StyledScrollView = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;

export const CornerTopRightContainer = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  height: ${getNormalizedVerticalSize(25)}px;
  width: ${getNormalizedHorizontalSize(55)}px;
  top: ${getNormalizedVerticalSize(50)}px;
  right: ${getNormalizedHorizontalSize(0)}px;
  z-index: 100;
  border-width: 0px;
  border-color: ${({ theme }) => theme.tokens.colors.secondary950};
  border-radius: 7px;
`;

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
  width: 100%;
  justify-content: space-between;
`;

export const BrandCircleContainer = styled(InterpolateColorAnimation)`
  position: absolute;
  height: ${PixelRatio.roundToNearestPixel(250)}px;
  width: ${PixelRatio.roundToNearestPixel(250)}px;
  border-radius: ${PixelRatio.roundToNearestPixel(140)}px;
  top: ${getNormalizedVerticalSize(70)}px;
  align-self: center;
`;

export const ContentContainer = styled.View``;

export const TitleContainer = styled.View`
  margin: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const DescriptionContainer = styled.View`
  flex: 1;
  margin: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(8)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(8)}px;
`;

export const StyledText = styled(Typography)``;

export const FeaturesContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(10)}px;
`;

export const FeatureButton = styled(ActionButton)``;

export const FeatureIcon = styled.Image`
  tint-color: ${({ theme }) => theme.tokens.colors.secondary950};
`;

export const BrandDecorItem1 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  bottom: ${getNormalizedVerticalSize(-200)}px;
  right: ${getNormalizedHorizontalSize(100)}px;
  height: ${getNormalizedVerticalSize(100)}px;
  width: ${getNormalizedHorizontalSize(100)}px;
  tint-color: ${({ theme }) => theme.tokens.colors.secondary400};
  z-index: 0;
`;

export const BrandDecorItem2 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  bottom: ${getNormalizedVerticalSize(-200)}px;
  right: ${getNormalizedHorizontalSize(90)}px;
  tint-color: ${({ theme }) => theme.tokens.colors.tertiary800};
  z-index: 0;
`;

export const BrandDecorItem3 = styled.View`
  height: ${getNormalizedVerticalSize(250)}px;
  width: ${getNormalizedHorizontalSize(250)}px;
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
  tint-color: ${({ theme }) => theme.tokens.colors.tertiary800};
`;

export const BrandDecorItem5 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  bottom: -5%;
  left: ${getNormalizedHorizontalSize(-100)}px;
  tint-color: ${({ theme }) => theme.tokens.colors.tertiary400};
`;

export const BrandDecorItem6 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  bottom: 15%;
  left: ${getNormalizedHorizontalSize(100)}px;
  tint-color: ${({ theme }) => theme.tokens.colors.primary500};
`;

export const BrandDecorItem7 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  top: -10%;
  left: ${getNormalizedHorizontalSize(0)}px;
  tint-color: ${({ theme }) => theme.tokens.colors.tertiary950};
`;

export const BrandDecorItem8 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: ${getNormalizedVerticalSize(140)}px;
  width: ${getNormalizedHorizontalSize(140)}px;
  position: absolute;
  bottom: ${getNormalizedVerticalSize(-220)}px;
  left: ${getNormalizedHorizontalSize(-10)}px;
  tint-color: ${({ theme }) => theme.tokens.colors.secondary500};
`;

export const BrandDecorItem9 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  top: 100%;
  left: ${getNormalizedHorizontalSize(0)}px;
  tint-color: ${({ theme }) => theme.tokens.colors.tertiary300};
  transform: rotate(30deg);
`;
