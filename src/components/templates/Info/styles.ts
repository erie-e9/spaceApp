import { PixelRatio } from 'react-native';
import styled from 'styled-components/native';
import { Typography } from '@components/atoms';

export const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: ${PixelRatio.roundToNearestPixel(40)}px;
  padding-top: ${PixelRatio.roundToNearestPixel(10)}px;
`;

export const TitleContainer = styled.View``;

export const TitleTypography = styled(Typography)``;

export const BodyContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;
