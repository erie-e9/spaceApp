import { PixelRatio, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Typography, Image } from '@components/atoms';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';

export const ContentHeader = styled.View`
  flex: 0.3;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const ContentContainer = styled.View`
  min-height: ${getNormalizedVerticalSize(20)}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(20)}px;
`;

export interface LogoProps {
  logoSize: number;
  avatarRadius: number;
}

export const LogoContainer = styled.View<LogoProps>`
  height: ${({ logoSize }) => PixelRatio.roundToNearestPixel(logoSize)}px;
  width: ${({ logoSize }) => PixelRatio.roundToNearestPixel(logoSize)}px;
  border-radius: ${({ avatarRadius }) => PixelRatio.roundToNearestPixel(avatarRadius)}px;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 0.3px;
  background-color: ${({ theme }) => theme.tokens.colors.secondary950};
`;

export const Logo = styled(Image)<LogoProps>`
  height: ${({ logoSize }) =>
    getNormalizedVerticalSize(Platform.OS === 'ios' ? logoSize : logoSize + 10)}px;
  width: ${({ logoSize }) => getNormalizedHorizontalSize(logoSize)}px;
  border-radius: ${({ avatarRadius }) => avatarRadius}px;
`;

export const StyledText = styled(Typography)`
  padding: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px;
`;
