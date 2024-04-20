import { PixelRatio } from 'react-native';
import styled from 'styled-components/native';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { Typography } from '@components/atoms';
import { ActionButton } from '@components/molecules';

export const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* padding-left: ${PixelRatio.roundToNearestPixel(40)}px; */
  padding-top: ${PixelRatio.roundToNearestPixel(10)}px;
`;

export const TitleContainer = styled.View``;

export const TitleTypography = styled(Typography)``;

export const BodyContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  height: auto;
  z-index: 200;
  justify-content: flex-end;
`;

export const StyledButton = styled(ActionButton)<{ isGreyed?: boolean }>`
  margin: ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(2)}px ${getNormalizedHorizontalSize(10)}px;
  opacity: ${({ isGreyed }) => (isGreyed ? 0.34 : 1)};
`;

export const LegendActionButton = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${getNormalizedVerticalSize(10)}px;
`;
