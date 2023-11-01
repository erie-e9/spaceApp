import styled from 'styled-components/native';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { Typography } from '@components/atoms';

export const UrlContainer = styled.View`
  height: auto;
  width: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${getNormalizedVerticalSize(7)}px;
  padding: ${getNormalizedVerticalSize(2)}px
    ${getNormalizedHorizontalSize(20)}px;
  background-color: ${({ theme }) => theme.tokens.colors.tertiaryD3};
`;

export const StyledUrlText = styled(Typography)`
  height: ${getNormalizedVerticalSize(20)}px;
`;

export const WebViewHeaderContainer = styled.View`
  height: ${getNormalizedVerticalSize(100)}px;
  justify-content: flex-end;
  align-items: flex-end;
  padding: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: ${({ theme }) => theme.tokens.colors.none};
`;

export const ActionButtonsContainer = styled.View`
  height: ${getNormalizedVerticalSize(30)}px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${getNormalizedVerticalSize(10)}px
    ${getNormalizedHorizontalSize(20)}px;
`;

export const ActionButtonContainer = styled.View`
  height: ${getNormalizedVerticalSize(30)}px;
  width: ${getNormalizedHorizontalSize(30)}px;
  margin: ${getNormalizedVerticalSize(0)} ${getNormalizedHorizontalSize(0)}px;
  align-items: center;
  justify-content: center;
`;
