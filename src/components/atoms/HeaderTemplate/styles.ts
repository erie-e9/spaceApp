import styled from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Typography } from '@components/atoms';

interface HeaderStyle {
  headerStyle: 'Primary' | 'Secondary';
  backButton?: boolean;
}

export const HeaderContainer = styled.View<HeaderStyle>`
  flex-direction: column;
  align-items: flex-start;
  width: auto;
  justify-content: flex-start;
  min-height: ${({ headerStyle }) =>
    getNormalizedVerticalSize(headerStyle === 'Primary' ? 80 : 45)}px;
  /* background-color: ${({ theme }) => theme.tokens.colors.tertiary700}; */
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
`;
export const HeaderLeftCotainer = styled.View<{
  hasHeaderOptions: boolean;
}>`
  flex-direction: row;
  min-height: 50px;
  align-items: center;
  width: ${({ hasHeaderOptions }) => (hasHeaderOptions ? '75%' : '100%')};
  justify-content: flex-start;
  /* background-color: transparent; */
`;

export const BackButtonContainer = styled.View<HeaderStyle>`
  height: auto;
  width: ${({ headerStyle }) => (headerStyle === 'Primary' ? 20 : 20)}px;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${getNormalizedVerticalSize(4)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  background-color: transparent;
`;

export const TitleTextContainer = styled.View<HeaderStyle>`
  width: ${({ backButton }) => backButton ? 90 : 100}%;
  justify-content: center;
  min-height: ${({ headerStyle }) =>
    getNormalizedVerticalSize(
      headerStyle === 'Primary' ? getNormalizedVerticalSize(30) : getNormalizedVerticalSize(30),
    )}px;
  align-items: ${({ headerStyle }) => (headerStyle === 'Primary' ? 'flex-start' : 'center')};
  background-color: transparent;
`;

export const TitleText = styled(Typography)``;

export const HeaderRightContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 100%;
  background-color: transparent;
`;

export const DescriptionContainer = styled.View<HeaderStyle>`
  align-self: ${({ headerStyle }) => (headerStyle === 'Primary' ? 'flex-start' : 'center')};
  background-color: transparent;
`;

export const DescriptionText = styled(Typography)``;
