import { View } from 'react-native';
import styled from 'styled-components/native';
import { getNormalizedHorizontalSize, getNormalizedVerticalSize } from '@utils/functions';
import { Typography } from '@components/atoms';
import { ActionButton } from '@components/molecules';

export const Container = styled(View)`
  flex-direction: row;
  height: ${getNormalizedVerticalSize(60)}px;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(24)}px;
  align-items: center;
`;

export const TextContainer = styled(View)`
  flex: 1;
  margin-left: ${getNormalizedHorizontalSize(16)}px;
  justify-content: center;
  font-size: ${getNormalizedVerticalSize(14)}px;
  line-height: ${getNormalizedVerticalSize(20.56)}px;
  font-weight: 500;
  height: auto;
  width: 100%;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledTitle = styled(Typography)``;

export const StyledSubtitle = styled(Typography)``;

export const RightContainer = styled.View`
  position: absolute;
  height: 100%;
  right: ${getNormalizedHorizontalSize(24)}px;
  justify-content: center;
`;

export const StyledSafeAreaView = styled.View`
  position: relative;
`;

export const StyledButton = styled(ActionButton)`
  margin: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(3)}px
    ${getNormalizedVerticalSize(15)}px ${getNormalizedHorizontalSize(3)}px;
  align-self: center;
  border: ${({ theme }) => theme.tokens.colors.secondary950};
  color: ${({ theme }) => (theme.mode === 'dark' ? theme.tokens.colors.secondary900 : '#67686b')};
`;
