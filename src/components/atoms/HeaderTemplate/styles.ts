import styled from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Typography } from '@components/atoms';
import { Platform } from 'react-native';

interface HeaderStyle {
  headerStyle: 'Primary' | 'Secondary';
}

export const HeaderContainer = styled.View<HeaderStyle>`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: ${({ headerStyle }) =>
    getNormalizedVerticalSize(headerStyle === 'Primary' ? 80 : 45)}px;
  /* padding: ${Platform.OS === 'ios' ? 50 : 50}px 0px 5px 0px; */
  /* background-color: ${({ theme }) => theme.tokens.colors.tertiary100}; */
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  /* background-color: #1ac05ac7; */
`;
export const HeaderLeftCotainer = styled.View<{
  hasHeaderOptions: boolean;
}>`
  flex-direction: row;
  width: ${({ hasHeaderOptions }) => (hasHeaderOptions ? '75%' : '100%')};
  justify-content: flex-start;
  /* background-color: #1ac05ac7; */
`;

export const BackButtonContainer = styled.View<HeaderStyle>`
  height: auto;
  width: ${({ headerStyle }) => (headerStyle === 'Primary' ? 20 : 20)}px;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${getNormalizedVerticalSize(4)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  /* background-color: #dcba10d8; */
`;

export const TitleTextContainer = styled.View<HeaderStyle>`
  width: 90%;
  justify-content: center;
  min-height: ${({ headerStyle }) =>
    getNormalizedVerticalSize(
      headerStyle === 'Primary' ? getNormalizedVerticalSize(30) : getNormalizedVerticalSize(30),
    )}px;
  align-items: ${({ headerStyle }) => (headerStyle === 'Primary' ? 'flex-start' : 'center')};
  /* background-color: #1a4fc0b3; */
`;

export const TitleText = styled(Typography)``;

export const HeaderRightContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  width: 20%;
  height: 100%;
  /* background-color: #c01a1db3; */
`;

export const DescriptionContainer = styled.View<HeaderStyle>`
  align-self: ${({ headerStyle }) => (headerStyle === 'Primary' ? 'flex-start' : 'center')};
  background-color: transparent;
`;

export const DescriptionText = styled(Typography)``;
