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
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const HeaderContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: ${PixelRatio.roundToNearestPixel(0)}px;
  background-color: transparent;
  min-height: ${getNormalizedVerticalSize(90)}px;
  max-height: ${getNormalizedVerticalSize(90)}px;
`;

export const TitleContainer = styled.View``;

export const TitleTypography = styled(Typography)``;

export const DescriptionContainer = styled.View`
  margin-top: ${getNormalizedVerticalSize(0)}px;
  background-color: transparent;
`;

export const DescriptionText = styled(Typography)<{
  underline?: boolean;
  isGreyed?: boolean;
}>`
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  opacity: ${({ isGreyed }) => (isGreyed ? 0.34 : 1)};
`;

export const BodyContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-top: ${getNormalizedVerticalSize(0)}px;
  background-color: transparent;
`;

export const ButtonsContainer = styled.View`
  height: auto;
  justify-content: flex-end;
  background-color: transparent;
`;

interface StyledButtonProps { isGreyed?: boolean, disabled?: boolean }

export const StyledButton = styled(ActionButton) <StyledButtonProps>`
  margin: ${getNormalizedVerticalSize(3)}px ${getNormalizedHorizontalSize(10)}px
    ${getNormalizedVerticalSize(3)}px ${getNormalizedHorizontalSize(10)}px;
  opacity: ${({ isGreyed, disabled }) => (isGreyed || disabled ? 0.65 : 1)};
`;

export const LegendActionButton = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${getNormalizedVerticalSize(10)}px;
`;

export const ArrayButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  background-color: transparent;
`;

export const ArrayButtonContainer = styled.View`
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(15)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(15)}px;
    background-color: transparent;
`;

export const ArrayFooterTextContainer = styled.View`
  margin: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px;
    background-color: transparent;
    align-items: center;
    align-self: center;
    width: 100%;
`;

export const ArrayFooterText = styled(Typography)`
  margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(15)}px
`;
